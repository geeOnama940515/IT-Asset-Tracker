'use client';

import { useState } from 'react';
import { Asset, AssetFormData } from '@/types/asset';
import { AssetIssuance, IssuanceFormData } from '@/types/issuance';
import { mockAssets } from '@/lib/mock-data';
import { mockIssuances } from '@/lib/issuance-data';
import { useAuth } from '@/contexts/auth-context';
import { hasPermission } from '@/lib/auth';
import { LoginForm } from '@/components/login-form';
import { Header } from '@/components/header';
import { AssetTable } from '@/components/asset-table';
import { AssetForm } from '@/components/asset-form';
import { AssetDetails } from '@/components/asset-details';
import { IssuanceForm } from '@/components/issuance-form';
import { IssuanceTable } from '@/components/issuance-table';
import { IssuanceDetails } from '@/components/issuance-details';
import { DashboardStats } from '@/components/dashboard-stats';
import { DeleteConfirmationDialog } from '@/components/delete-confirmation-dialog';
import { ReturnConfirmationDialog } from '@/components/return-confirmation-dialog';
import { SuccessNotification } from '@/components/success-notification';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Send, Package } from 'lucide-react';

export default function Home() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const [assets, setAssets] = useState<Asset[]>(mockAssets);
  const [issuances, setIssuances] = useState<AssetIssuance[]>(mockIssuances);
  const [showAssetForm, setShowAssetForm] = useState(false);
  const [showIssuanceForm, setShowIssuanceForm] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const [viewingAsset, setViewingAsset] = useState<Asset | null>(null);
  const [viewingIssuance, setViewingIssuance] = useState<AssetIssuance | null>(null);
  const [selectedAssetForIssuance, setSelectedAssetForIssuance] = useState<string>('');
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    assetId: string;
    assetName: string;
  }>({ isOpen: false, assetId: '', assetName: '' });
  const [returnDialog, setReturnDialog] = useState<{
    isOpen: boolean;
    issuanceId: string;
    assetName: string;
    issuedTo: string;
  }>({ isOpen: false, issuanceId: '', assetName: '', issuedTo: '' });
  const [successNotification, setSuccessNotification] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
  }>({ isOpen: false, title: '', message: '' });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const handleAddAsset = (formData: AssetFormData) => {
    const newAsset: Asset = {
      id: Date.now().toString(),
      ...formData,
      purchasePrice: parseFloat(formData.purchasePrice),
      lastUpdated: new Date().toISOString()
    };
    setAssets([...assets, newAsset]);
    setShowAssetForm(false);
    setSuccessNotification({
      isOpen: true,
      title: 'Asset Added',
      message: `${newAsset.name} has been successfully added to the inventory.`
    });
  };

  const handleEditAsset = (formData: AssetFormData) => {
    if (!editingAsset) return;
    
    const updatedAsset: Asset = {
      ...editingAsset,
      ...formData,
      purchasePrice: parseFloat(formData.purchasePrice),
      lastUpdated: new Date().toISOString()
    };
    
    setAssets(assets.map(asset => 
      asset.id === editingAsset.id ? updatedAsset : asset
    ));
    setEditingAsset(null);
    setSuccessNotification({
      isOpen: true,
      title: 'Asset Updated',
      message: `${updatedAsset.name} has been successfully updated.`
    });
  };

  const handleDeleteAsset = (asset: Asset) => {
    setDeleteDialog({
      isOpen: true,
      assetId: asset.id,
      assetName: asset.name
    });
  };

  const confirmDeleteAsset = () => {
    const assetName = assets.find(a => a.id === deleteDialog.assetId)?.name || 'Asset';
    setAssets(assets.filter(asset => asset.id !== deleteDialog.assetId));
    setSuccessNotification({
      isOpen: true,
      title: 'Asset Deleted',
      message: `${assetName} has been successfully deleted from the inventory.`
    });
  };

  const handleEditClick = (asset: Asset) => {
    setEditingAsset(asset);
    setViewingAsset(null);
  };

  const handleViewClick = (asset: Asset) => {
    setViewingAsset(asset);
  };

  const handleIssueAsset = (formData: IssuanceFormData) => {
    const asset = assets.find(a => a.id === formData.assetId);
    if (!asset) return;

    const newIssuance: AssetIssuance = {
      id: Date.now().toString(),
      assetId: formData.assetId,
      assetName: asset.name,
      issuedTo: formData.issuedTo,
      issuedBy: user?.name || 'Unknown',
      issuedDate: new Date().toISOString().split('T')[0],
      expectedReturnDate: formData.expectedReturnDate || undefined,
      status: 'issued',
      purpose: formData.purpose,
      notes: formData.notes,
      conditions: formData.conditions,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Update asset assignment
    const updatedAssets = assets.map(a => 
      a.id === formData.assetId 
        ? { ...a, assignedTo: formData.issuedTo, lastUpdated: new Date().toISOString() }
        : a
    );

    setAssets(updatedAssets);
    setIssuances([...issuances, newIssuance]);
    setShowIssuanceForm(false);
    setSelectedAssetForIssuance('');
    setSuccessNotification({
      isOpen: true,
      title: 'Asset Issued',
      message: `${asset.name} has been successfully issued to ${formData.issuedTo}.`
    });
  };

  const handleReturnAsset = (issuanceId: string) => {
    const issuance = issuances.find(i => i.id === issuanceId);
    if (!issuance) return;

    setReturnDialog({
      isOpen: true,
      issuanceId,
      assetName: issuance.assetName,
      issuedTo: issuance.issuedTo
    });
  };

  const confirmReturnAsset = () => {
    const issuance = issuances.find(i => i.id === returnDialog.issuanceId);
    if (!issuance) return;

    // Update issuance status
    const updatedIssuances = issuances.map(i => 
      i.id === returnDialog.issuanceId 
        ? { 
            ...i, 
            status: 'returned' as const, 
            actualReturnDate: new Date().toISOString().split('T')[0],
            updatedAt: new Date().toISOString()
          }
        : i
    );

    // Update asset assignment back to unassigned
    const updatedAssets = assets.map(a => 
      a.id === issuance.assetId 
        ? { ...a, assignedTo: 'Unassigned', lastUpdated: new Date().toISOString() }
        : a
    );

    setIssuances(updatedIssuances);
    setAssets(updatedAssets);
    setSuccessNotification({
      isOpen: true,
      title: 'Asset Returned',
      message: `${issuance.assetName} has been successfully returned and is now available.`
    });
  };

  const handleQuickIssue = (assetId: string) => {
    setSelectedAssetForIssuance(assetId);
    setShowIssuanceForm(true);
  };

  const canCreate = hasPermission(user?.role || 'employee', 'create');
  const canIssue = hasPermission(user?.role || 'employee', 'issue');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <DashboardStats assets={assets} />

        <Tabs defaultValue="assets" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="assets">Assets</TabsTrigger>
            <TabsTrigger value="issuances">Issuances</TabsTrigger>
          </TabsList>

          <TabsContent value="assets" className="space-y-6">
            <div className="flex justify-end gap-2">
              {canCreate && (
                <Button onClick={() => setShowAssetForm(true)} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Asset
                </Button>
              )}
            </div>

            <AssetTable
              assets={assets}
              onEdit={canCreate ? handleEditClick : () => {}}
              onDelete={canCreate ? handleDeleteAsset : () => {}}
              onView={handleViewClick}
              onIssue={canIssue ? handleQuickIssue : undefined}
            />
          </TabsContent>

          <TabsContent value="issuances" className="space-y-6">
            <div className="flex justify-end gap-2">
              {canIssue && (
                <Button onClick={() => setShowIssuanceForm(true)} className="gap-2">
                  <Send className="h-4 w-4" />
                  Issue Asset
                </Button>
              )}
            </div>

            <IssuanceTable
              issuances={issuances}
              onReturn={canIssue ? handleReturnAsset : () => {}}
              onView={(issuance) => setViewingIssuance(issuance)}
            />
          </TabsContent>
        </Tabs>

        {showAssetForm && (
          <AssetForm
            onSubmit={handleAddAsset}
            onCancel={() => setShowAssetForm(false)}
          />
        )}

        {editingAsset && (
          <AssetForm
            onSubmit={handleEditAsset}
            onCancel={() => setEditingAsset(null)}
            initialData={editingAsset}
            isEditing={true}
          />
        )}

        {viewingAsset && (
          <AssetDetails
            asset={viewingAsset}
            onClose={() => setViewingAsset(null)}
            onEdit={canCreate ? () => handleEditClick(viewingAsset) : undefined}
          />
        )}

        {showIssuanceForm && (
          <IssuanceForm
            assets={assets}
            onSubmit={handleIssueAsset}
            onCancel={() => {
              setShowIssuanceForm(false);
              setSelectedAssetForIssuance('');
            }}
            selectedAssetId={selectedAssetForIssuance}
          />
        )}

        {viewingIssuance && (
          <IssuanceDetails
            issuance={viewingIssuance}
            onClose={() => setViewingIssuance(null)}
          />
        )}

        <DeleteConfirmationDialog
          isOpen={deleteDialog.isOpen}
          onClose={() => setDeleteDialog({ isOpen: false, assetId: '', assetName: '' })}
          onConfirm={confirmDeleteAsset}
          title="Delete Asset"
          description="Are you sure you want to delete this asset? This will permanently remove it from your inventory."
          itemName={deleteDialog.assetName}
        />

        <ReturnConfirmationDialog
          isOpen={returnDialog.isOpen}
          onClose={() => setReturnDialog({ isOpen: false, issuanceId: '', assetName: '', issuedTo: '' })}
          onConfirm={confirmReturnAsset}
          assetName={returnDialog.assetName}
          issuedTo={returnDialog.issuedTo}
        />

        <SuccessNotification
          isOpen={successNotification.isOpen}
          onClose={() => setSuccessNotification({ isOpen: false, title: '', message: '' })}
          title={successNotification.title}
          message={successNotification.message}
        />
      </div>
    </div>
  );
}
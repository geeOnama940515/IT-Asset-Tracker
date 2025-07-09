'use client';

import { useState } from 'react';
import { Asset, AssetFormData } from '@/types/asset';
import { mockAssets } from '@/lib/mock-data';
import { AssetTable } from '@/components/asset-table';
import { AssetForm } from '@/components/asset-form';
import { AssetDetails } from '@/components/asset-details';
import { DashboardStats } from '@/components/dashboard-stats';
import { Button } from '@/components/ui/button';
import { Plus, Package } from 'lucide-react';

export default function Home() {
  const [assets, setAssets] = useState<Asset[]>(mockAssets);
  const [showForm, setShowForm] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const [viewingAsset, setViewingAsset] = useState<Asset | null>(null);

  const handleAddAsset = (formData: AssetFormData) => {
    const newAsset: Asset = {
      id: Date.now().toString(),
      ...formData,
      purchasePrice: parseFloat(formData.purchasePrice),
      lastUpdated: new Date().toISOString()
    };
    setAssets([...assets, newAsset]);
    setShowForm(false);
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
  };

  const handleDeleteAsset = (id: string) => {
    if (confirm('Are you sure you want to delete this asset?')) {
      setAssets(assets.filter(asset => asset.id !== id));
    }
  };

  const handleEditClick = (asset: Asset) => {
    setEditingAsset(asset);
    setViewingAsset(null);
  };

  const handleViewClick = (asset: Asset) => {
    setViewingAsset(asset);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Package className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">IT Asset Tracker</h1>
              <p className="text-gray-600">Manage and monitor your IT assets efficiently</p>
            </div>
          </div>
          <Button onClick={() => setShowForm(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Asset
          </Button>
        </div>

        <DashboardStats assets={assets} />

        <AssetTable
          assets={assets}
          onEdit={handleEditClick}
          onDelete={handleDeleteAsset}
          onView={handleViewClick}
        />

        {showForm && (
          <AssetForm
            onSubmit={handleAddAsset}
            onCancel={() => setShowForm(false)}
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
            onEdit={() => handleEditClick(viewingAsset)}
          />
        )}
      </div>
    </div>
  );
}
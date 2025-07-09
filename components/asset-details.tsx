'use client';

import { Asset } from '@/types/asset';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { X, Calendar, DollarSign, MapPin, User, Package, Hash, Building } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AssetDetailsProps {
  asset: Asset;
  onClose: () => void;
  onEdit: () => void;
}

export function AssetDetails({ asset, onClose, onEdit }: AssetDetailsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'disposed': return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'lost': return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'hardware': return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'software': return 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200';
      case 'network': return 'bg-cyan-100 text-cyan-800 hover:bg-cyan-200';
      case 'mobile': return 'bg-pink-100 text-pink-800 hover:bg-pink-200';
      case 'peripheral': return 'bg-orange-100 text-orange-800 hover:bg-orange-200';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isWarrantyExpiring = () => {
    if (!asset.warrantyExpiry) return false;
    const expiryDate = new Date(asset.warrantyExpiry);
    const today = new Date();
    const thirtyDaysFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    return expiryDate <= thirtyDaysFromNow && expiryDate >= today;
  };

  const isWarrantyExpired = () => {
    if (!asset.warrantyExpiry) return false;
    return new Date(asset.warrantyExpiry) < new Date();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl">{asset.name}</CardTitle>
            <div className="flex gap-2 mt-2">
              <Badge variant="secondary" className={cn("capitalize", getTypeColor(asset.type))}>
                {asset.type}
              </Badge>
              <Badge variant="secondary" className={cn("capitalize", getStatusColor(asset.status))}>
                {asset.status}
              </Badge>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-3">Basic Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Category:</span>
                    <span className="font-medium">{asset.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Hash className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Serial Number:</span>
                    <span className="font-mono text-sm">{asset.serialNumber}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Manufacturer:</span>
                    <span className="font-medium">{asset.manufacturer}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Model:</span>
                    <span className="font-medium">{asset.model}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-3">Assignment</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Assigned To:</span>
                    <span className="font-medium">{asset.assignedTo}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Location:</span>
                    <span className="font-medium">{asset.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-3">Financial Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Purchase Price:</span>
                    <span className="font-medium">${asset.purchasePrice.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Purchase Date:</span>
                    <span className="font-medium">{formatDate(asset.purchaseDate)}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-3">Warranty Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Warranty Expiry:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {asset.warrantyExpiry ? formatDate(asset.warrantyExpiry) : 'Not specified'}
                      </span>
                      {isWarrantyExpired() && (
                        <Badge variant="destructive" className="text-xs">Expired</Badge>
                      )}
                      {isWarrantyExpiring() && !isWarrantyExpired() && (
                        <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">Expiring Soon</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {asset.description && (
            <>
              <Separator />
              <div>
                <h3 className="font-semibold text-lg mb-3">Description</h3>
                <p className="text-muted-foreground">{asset.description}</p>
              </div>
            </>
          )}

          <Separator />

          <div className="text-xs text-muted-foreground">
            Last updated: {new Date(asset.lastUpdated).toLocaleString()}
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button onClick={onEdit}>
              Edit Asset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
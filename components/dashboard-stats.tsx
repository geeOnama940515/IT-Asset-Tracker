'use client';

import { Asset } from '@/types/asset';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Monitor, Smartphone, Network, HardDrive, Printer, AlertTriangle, DollarSign, Package } from 'lucide-react';

interface DashboardStatsProps {
  assets: Asset[];
}

export function DashboardStats({ assets }: DashboardStatsProps) {
  const totalAssets = assets.length;
  const activeAssets = assets.filter(asset => asset.status === 'active').length;
  const maintenanceAssets = assets.filter(asset => asset.status === 'maintenance').length;
  const totalValue = assets.reduce((sum, asset) => sum + asset.purchasePrice, 0);

  const assetsByType = {
    hardware: assets.filter(asset => asset.type === 'hardware').length,
    software: assets.filter(asset => asset.type === 'software').length,
    network: assets.filter(asset => asset.type === 'network').length,
    mobile: assets.filter(asset => asset.type === 'mobile').length,
    peripheral: assets.filter(asset => asset.type === 'peripheral').length,
  };

  const warrantyExpiring = assets.filter(asset => {
    if (!asset.warrantyExpiry) return false;
    const expiryDate = new Date(asset.warrantyExpiry);
    const today = new Date();
    const thirtyDaysFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    return expiryDate <= thirtyDaysFromNow && expiryDate >= today;
  }).length;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'hardware': return <HardDrive className="h-4 w-4" />;
      case 'software': return <Monitor className="h-4 w-4" />;
      case 'network': return <Network className="h-4 w-4" />;
      case 'mobile': return <Smartphone className="h-4 w-4" />;
      case 'peripheral': return <Printer className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalAssets}</div>
          <p className="text-xs text-muted-foreground">
            {activeAssets} active, {maintenanceAssets} in maintenance
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Value</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            Combined asset value
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Warranty Alerts</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-600">{warrantyExpiring}</div>
          <p className="text-xs text-muted-foreground">
            Expiring within 30 days
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Asset Types</CardTitle>
          <Monitor className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(assetsByType).map(([type, count]) => (
              <div key={type} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getTypeIcon(type)}
                  <span className="text-sm capitalize">{type}</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {count}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
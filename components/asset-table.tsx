'use client';

import { useState } from 'react';
import { Asset } from '@/types/asset';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Filter, Edit, Trash2, Eye, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AssetTableProps {
  assets: Asset[];
  onEdit: (asset: Asset) => void;
  onDelete: (asset: Asset) => void;
  onView: (asset: Asset) => void;
  onIssue?: (assetId: string) => void;
}

export function AssetTable({ assets, onEdit, onDelete, onView, onIssue }: AssetTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || asset.status === statusFilter;
    const matchesType = typeFilter === 'all' || asset.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Asset Inventory</CardTitle>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="disposed">Disposed</SelectItem>
                <SelectItem value="lost">Lost</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[140px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="hardware">Hardware</SelectItem>
                <SelectItem value="software">Software</SelectItem>
                <SelectItem value="network">Network</SelectItem>
                <SelectItem value="mobile">Mobile</SelectItem>
                <SelectItem value="peripheral">Peripheral</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Serial Number</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Purchase Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssets.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    No assets found matching your criteria
                  </TableCell>
                </TableRow>
              ) : (
                filteredAssets.map((asset) => (
                  <TableRow key={asset.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{asset.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={cn("capitalize", getTypeColor(asset.type))}>
                        {asset.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{asset.serialNumber}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={cn("capitalize", getStatusColor(asset.status))}>
                        {asset.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{asset.assignedTo}</TableCell>
                    <TableCell>{asset.location}</TableCell>
                    <TableCell>${asset.purchasePrice.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onView(asset)}
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {onIssue && asset.status === 'active' && asset.assignedTo === 'Unassigned' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onIssue(asset.id)}
                            className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700"
                            title="Issue Asset"
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEdit(asset)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDelete(asset)}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          Showing {filteredAssets.length} of {assets.length} assets
        </div>
      </CardContent>
    </Card>
  );
}
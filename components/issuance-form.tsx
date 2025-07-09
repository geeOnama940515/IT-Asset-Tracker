'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IssuanceFormData } from '@/types/issuance';
import { Asset } from '@/types/asset';
import { employees } from '@/lib/mock-data';
import { X } from 'lucide-react';

interface IssuanceFormProps {
  assets: Asset[];
  onSubmit: (data: IssuanceFormData) => void;
  onCancel: () => void;
  selectedAssetId?: string;
}

export function IssuanceForm({ assets, onSubmit, onCancel, selectedAssetId }: IssuanceFormProps) {
  const [formData, setFormData] = useState<IssuanceFormData>({
    assetId: selectedAssetId || '',
    issuedTo: '',
    expectedReturnDate: '',
    purpose: '',
    notes: '',
    conditions: 'Good condition'
  });

  const availableAssets = assets.filter(asset => 
    asset.status === 'active' && asset.assignedTo === 'Unassigned'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field: keyof IssuanceFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Issue Asset</CardTitle>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="assetId">Asset *</Label>
                <Select 
                  value={formData.assetId} 
                  onValueChange={(value) => handleInputChange('assetId', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select asset to issue" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableAssets.map((asset) => (
                      <SelectItem key={asset.id} value={asset.id}>
                        {asset.name} - {asset.serialNumber}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="issuedTo">Issue To *</Label>
                <Select 
                  value={formData.issuedTo} 
                  onValueChange={(value) => handleInputChange('issuedTo', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.filter(emp => emp !== 'Unassigned' && emp !== 'All Employees').map((employee) => (
                      <SelectItem key={employee} value={employee}>{employee}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="expectedReturnDate">Expected Return Date</Label>
                <Input
                  id="expectedReturnDate"
                  type="date"
                  value={formData.expectedReturnDate}
                  onChange={(e) => handleInputChange('expectedReturnDate', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="purpose">Purpose *</Label>
                <Input
                  id="purpose"
                  value={formData.purpose}
                  onChange={(e) => handleInputChange('purpose', e.target.value)}
                  placeholder="e.g., Development work, Sales activities"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="conditions">Asset Condition *</Label>
              <Select 
                value={formData.conditions} 
                onValueChange={(value) => handleInputChange('conditions', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Excellent condition">Excellent condition</SelectItem>
                  <SelectItem value="Good condition">Good condition</SelectItem>
                  <SelectItem value="Fair condition">Fair condition</SelectItem>
                  <SelectItem value="Poor condition">Poor condition</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                rows={3}
                placeholder="Additional notes about the issuance..."
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">
                Issue Asset
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
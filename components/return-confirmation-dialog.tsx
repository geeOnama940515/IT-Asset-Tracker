'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RotateCcw, X } from 'lucide-react';

interface ReturnConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  assetName: string;
  issuedTo: string;
}

export function ReturnConfirmationDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  assetName,
  issuedTo
}: ReturnConfirmationDialogProps) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-full">
              <RotateCcw className="h-5 w-5 text-green-600" />
            </div>
            <CardTitle className="text-lg">Return Asset</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-muted-foreground">
              Are you sure you want to mark this asset as returned?
            </p>
            <div className="p-3 bg-muted rounded-lg space-y-1">
              <p className="font-medium text-sm">Asset: {assetName}</p>
              <p className="text-sm text-muted-foreground">Currently issued to: {issuedTo}</p>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-blue-800 text-sm">
              The asset will be marked as returned and become available for reassignment.
            </p>
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleConfirm} className="bg-green-600 hover:bg-green-700">
              Mark as Returned
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
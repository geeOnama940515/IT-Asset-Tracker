'use client';

import { AssetIssuance } from '@/types/issuance';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { X, Calendar, User, Package, FileText, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IssuanceDetailsProps {
  issuance: AssetIssuance;
  onClose: () => void;
}

export function IssuanceDetails({ issuance, onClose }: IssuanceDetailsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'issued': return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'returned': return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'overdue': return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'lost': return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
      case 'damaged': return 'bg-orange-100 text-orange-800 hover:bg-orange-200';
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

  const isOverdue = () => {
    if (!issuance.expectedReturnDate || issuance.status !== 'issued') return false;
    return new Date(issuance.expectedReturnDate) < new Date();
  };

  const getDaysOverdue = () => {
    if (!isOverdue()) return 0;
    const today = new Date();
    const expectedReturn = new Date(issuance.expectedReturnDate!);
    const diffTime = today.getTime() - expectedReturn.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Issuance Details</CardTitle>
            <div className="flex gap-2 mt-2">
              <Badge variant="secondary" className={cn("capitalize", getStatusColor(issuance.status))}>
                {issuance.status}
              </Badge>
              {isOverdue() && (
                <Badge variant="destructive" className="gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {getDaysOverdue()} days overdue
                </Badge>
              )}
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
                <h3 className="font-semibold text-lg mb-3">Asset Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Asset:</span>
                    <span className="font-medium">{issuance.assetName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Issued To:</span>
                    <span className="font-medium">{issuance.issuedTo}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Issued By:</span>
                    <span className="font-medium">{issuance.issuedBy}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-3">Purpose & Conditions</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-muted-foreground">Purpose:</span>
                    <p className="font-medium mt-1">{issuance.purpose}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Conditions at Issue:</span>
                    <p className="font-medium mt-1">{issuance.conditions}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-3">Timeline</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Issue Date:</span>
                    <span className="font-medium">{formatDate(issuance.issuedDate)}</span>
                  </div>
                  {issuance.expectedReturnDate && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Expected Return:</span>
                      <span className="font-medium">{formatDate(issuance.expectedReturnDate)}</span>
                    </div>
                  )}
                  {issuance.actualReturnDate && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Actual Return:</span>
                      <span className="font-medium">{formatDate(issuance.actualReturnDate)}</span>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-3">Status Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Current Status:</span>
                    <Badge variant="secondary" className={cn("capitalize", getStatusColor(issuance.status))}>
                      {issuance.status}
                    </Badge>
                  </div>
                  {isOverdue() && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center gap-2 text-red-800">
                        <AlertCircle className="h-4 w-4" />
                        <span className="font-medium">Overdue by {getDaysOverdue()} days</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {issuance.notes && (
            <>
              <Separator />
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Notes
                </h3>
                <p className="text-muted-foreground bg-muted p-3 rounded-lg">{issuance.notes}</p>
              </div>
            </>
          )}

          <Separator />

          <div className="text-xs text-muted-foreground">
            <p>Created: {new Date(issuance.createdAt).toLocaleString()}</p>
            <p>Last updated: {new Date(issuance.updatedAt).toLocaleString()}</p>
          </div>

          <div className="flex justify-end pt-4">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
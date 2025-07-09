'use client';

import { useState } from 'react';
import { AssetIssuance } from '@/types/issuance';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Filter, RotateCcw, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IssuanceTableProps {
  issuances: AssetIssuance[];
  onReturn: (id: string) => void;
  onView: (issuance: AssetIssuance) => void;
}

export function IssuanceTable({ issuances, onReturn, onView }: IssuanceTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredIssuances = issuances.filter(issuance => {
    const matchesSearch = issuance.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issuance.issuedTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issuance.purpose.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || issuance.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

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
      month: 'short',
      day: 'numeric'
    });
  };

  const isOverdue = (issuance: AssetIssuance) => {
    if (!issuance.expectedReturnDate || issuance.status !== 'issued') return false;
    return new Date(issuance.expectedReturnDate) < new Date();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Asset Issuances</CardTitle>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search issuances..."
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
                <SelectItem value="issued">Issued</SelectItem>
                <SelectItem value="returned">Returned</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="lost">Lost</SelectItem>
                <SelectItem value="damaged">Damaged</SelectItem>
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
                <TableHead>Asset</TableHead>
                <TableHead>Issued To</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Expected Return</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIssuances.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No issuances found matching your criteria
                  </TableCell>
                </TableRow>
              ) : (
                filteredIssuances.map((issuance) => (
                  <TableRow key={issuance.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{issuance.assetName}</TableCell>
                    <TableCell>{issuance.issuedTo}</TableCell>
                    <TableCell>{formatDate(issuance.issuedDate)}</TableCell>
                    <TableCell>
                      {issuance.expectedReturnDate ? (
                        <div className="flex items-center gap-2">
                          <span>{formatDate(issuance.expectedReturnDate)}</span>
                          {isOverdue(issuance) && (
                            <Badge variant="destructive" className="text-xs">Overdue</Badge>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">Not specified</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={cn("capitalize", getStatusColor(issuance.status))}>
                        {issuance.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">{issuance.purpose}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onView(issuance)}
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {issuance.status === 'issued' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onReturn(issuance.id)}
                            className="h-8 w-8 p-0 text-green-600 hover:text-green-700"
                          >
                            <RotateCcw className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          Showing {filteredIssuances.length} of {issuances.length} issuances
        </div>
      </CardContent>
    </Card>
  );
}
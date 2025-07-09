export interface AssetIssuance {
  id: string;
  assetId: string;
  assetName: string;
  issuedTo: string;
  issuedBy: string;
  issuedDate: string;
  expectedReturnDate?: string;
  actualReturnDate?: string;
  status: IssuanceStatus;
  purpose: string;
  notes?: string;
  conditions: string;
  createdAt: string;
  updatedAt: string;
}

export type IssuanceStatus = 'issued' | 'returned' | 'overdue' | 'lost' | 'damaged';

export interface IssuanceFormData {
  assetId: string;
  issuedTo: string;
  expectedReturnDate?: string;
  purpose: string;
  notes?: string;
  conditions: string;
}
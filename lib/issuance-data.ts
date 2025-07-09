import { AssetIssuance } from '@/types/issuance';

export const mockIssuances: AssetIssuance[] = [
  {
    id: '1',
    assetId: '1',
    assetName: 'MacBook Pro 16"',
    issuedTo: 'John Doe',
    issuedBy: 'Admin User',
    issuedDate: '2024-01-15',
    expectedReturnDate: '2024-07-15',
    status: 'issued',
    purpose: 'Development work',
    conditions: 'Good condition, all accessories included',
    notes: 'Primary development laptop',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    assetId: '5',
    assetName: 'iPhone 14 Pro',
    issuedTo: 'Mike Johnson',
    issuedBy: 'Admin User',
    issuedDate: '2023-09-25',
    expectedReturnDate: '2024-09-25',
    status: 'issued',
    purpose: 'Sales activities',
    conditions: 'Excellent condition with case and charger',
    notes: 'Company phone for sales manager',
    createdAt: '2023-09-25T14:30:00Z',
    updatedAt: '2023-09-25T14:30:00Z'
  },
  {
    id: '3',
    assetId: '2',
    assetName: 'Dell OptiPlex 7090',
    issuedTo: 'Jane Smith',
    issuedBy: 'John Manager',
    issuedDate: '2023-03-20',
    expectedReturnDate: '2025-03-20',
    actualReturnDate: '2024-01-10',
    status: 'returned',
    purpose: 'Graphic design work',
    conditions: 'Good condition, minor wear on keyboard',
    notes: 'Returned early due to upgrade',
    createdAt: '2023-03-20T09:15:00Z',
    updatedAt: '2024-01-10T16:20:00Z'
  }
];
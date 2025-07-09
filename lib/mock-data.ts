import { Asset } from '@/types/asset';

export const mockAssets: Asset[] = [
  {
    id: '1',
    name: 'MacBook Pro 16"',
    type: 'hardware',
    category: 'Laptop',
    serialNumber: 'MBP2023001',
    model: 'MacBook Pro 16-inch',
    manufacturer: 'Apple',
    purchaseDate: '2023-01-15',
    purchasePrice: 2499,
    warrantyExpiry: '2026-01-15',
    status: 'active',
    location: 'Office Floor 2',
    assignedTo: 'John Doe',
    description: 'Primary development laptop for senior developer',
    lastUpdated: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Dell OptiPlex 7090',
    type: 'hardware',
    category: 'Desktop',
    serialNumber: 'DOP2023002',
    model: 'OptiPlex 7090',
    manufacturer: 'Dell',
    purchaseDate: '2023-03-20',
    purchasePrice: 1299,
    warrantyExpiry: '2026-03-20',
    status: 'active',
    location: 'Office Floor 1',
    assignedTo: 'Jane Smith',
    description: 'Workstation for graphic design team',
    lastUpdated: '2024-01-10T14:20:00Z'
  },
  {
    id: '3',
    name: 'Microsoft Office 365',
    type: 'software',
    category: 'Productivity Suite',
    serialNumber: 'MSO365-2023-003',
    model: 'Business Premium',
    manufacturer: 'Microsoft',
    purchaseDate: '2023-01-01',
    purchasePrice: 22,
    warrantyExpiry: '2024-01-01',
    status: 'active',
    location: 'Cloud',
    assignedTo: 'All Employees',
    description: 'Company-wide productivity suite license',
    lastUpdated: '2024-01-01T09:00:00Z'
  },
  {
    id: '4',
    name: 'Cisco Catalyst 2960',
    type: 'network',
    category: 'Switch',
    serialNumber: 'CSC2960004',
    model: 'Catalyst 2960-X',
    manufacturer: 'Cisco',
    purchaseDate: '2022-11-10',
    purchasePrice: 899,
    warrantyExpiry: '2025-11-10',
    status: 'active',
    location: 'Server Room',
    assignedTo: 'IT Department',
    description: '24-port managed switch for office network',
    lastUpdated: '2023-12-15T16:45:00Z'
  },
  {
    id: '5',
    name: 'iPhone 14 Pro',
    type: 'mobile',
    category: 'Smartphone',
    serialNumber: 'IPH14P005',
    model: 'iPhone 14 Pro',
    manufacturer: 'Apple',
    purchaseDate: '2023-09-25',
    purchasePrice: 999,
    warrantyExpiry: '2024-09-25',
    status: 'active',
    location: 'Mobile',
    assignedTo: 'Mike Johnson',
    description: 'Company phone for sales manager',
    lastUpdated: '2024-01-05T11:15:00Z'
  },
  {
    id: '6',
    name: 'HP LaserJet Pro',
    type: 'peripheral',
    category: 'Printer',
    serialNumber: 'HPL2023006',
    model: 'LaserJet Pro M404n',
    manufacturer: 'HP',
    purchaseDate: '2023-02-14',
    purchasePrice: 299,
    warrantyExpiry: '2024-02-14',
    status: 'maintenance',
    location: 'Office Floor 1',
    assignedTo: 'Office Manager',
    description: 'Main office printer - currently under maintenance',
    lastUpdated: '2024-01-12T13:30:00Z'
  }
];

export const assetCategories = {
  hardware: ['Laptop', 'Desktop', 'Server', 'Tablet'],
  software: ['Operating System', 'Productivity Suite', 'Development Tools', 'Security Software'],
  network: ['Router', 'Switch', 'Firewall', 'Access Point'],
  mobile: ['Smartphone', 'Tablet', 'Smartwatch'],
  peripheral: ['Printer', 'Monitor', 'Keyboard', 'Mouse', 'Webcam']
};

export const locations = [
  'Office Floor 1',
  'Office Floor 2',
  'Office Floor 3',
  'Server Room',
  'Storage Room',
  'Remote',
  'Mobile',
  'Cloud'
];

export const employees = [
  'John Doe',
  'Jane Smith',
  'Mike Johnson',
  'Sarah Wilson',
  'David Brown',
  'Lisa Davis',
  'Tom Anderson',
  'Emily Taylor',
  'IT Department',
  'Office Manager',
  'All Employees',
  'Unassigned'
];
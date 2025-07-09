export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  category: string;
  serialNumber: string;
  model: string;
  manufacturer: string;
  purchaseDate: string;
  purchasePrice: number;
  warrantyExpiry: string;
  status: AssetStatus;
  location: string;
  assignedTo: string;
  description: string;
  lastUpdated: string;
}

export type AssetType = 'hardware' | 'software' | 'network' | 'mobile' | 'peripheral';

export type AssetStatus = 'active' | 'inactive' | 'maintenance' | 'disposed' | 'lost';

export interface AssetFormData {
  name: string;
  type: AssetType;
  category: string;
  serialNumber: string;
  model: string;
  manufacturer: string;
  purchaseDate: string;
  purchasePrice: string;
  warrantyExpiry: string;
  status: AssetStatus;
  location: string;
  assignedTo: string;
  description: string;
}
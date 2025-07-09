import { User, UserRole } from '@/types/auth';

// Mock users for demonstration
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@company.com',
    name: 'Admin User',
    role: 'admin',
    department: 'IT',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    email: 'manager@company.com',
    name: 'John Manager',
    role: 'manager',
    department: 'Operations',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    email: 'employee@company.com',
    name: 'Jane Employee',
    role: 'employee',
    department: 'Sales',
    createdAt: '2024-01-01T00:00:00Z'
  }
];

export const authenticateUser = async (email: string, password: string): Promise<User | null> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // For demo purposes, accept any password for existing users
  const user = mockUsers.find(u => u.email === email);
  return user || null;
};

export const hasPermission = (userRole: UserRole, action: string): boolean => {
  const permissions = {
    admin: ['create', 'read', 'update', 'delete', 'issue', 'return', 'manage_users'],
    manager: ['create', 'read', 'update', 'issue', 'return'],
    employee: ['read']
  };
  
  return permissions[userRole]?.includes(action) || false;
};
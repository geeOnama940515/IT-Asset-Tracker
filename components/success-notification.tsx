'use client';

import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SuccessNotificationProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  autoClose?: boolean;
  duration?: number;
}

export function SuccessNotification({ 
  isOpen, 
  onClose, 
  title, 
  message, 
  autoClose = true,
  duration = 3000
}: SuccessNotificationProps) {
  useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, duration, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2">
      <Card className="w-80 shadow-lg border-green-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-1 bg-green-100 rounded-full">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="font-medium text-sm text-green-900">{title}</p>
              <p className="text-sm text-green-700">{message}</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="h-6 w-6 p-0 text-green-600 hover:text-green-700"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
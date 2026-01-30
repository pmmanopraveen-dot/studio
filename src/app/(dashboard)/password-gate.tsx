'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PasswordGateProps {
  onSuccess: () => void;
}

export default function PasswordGate({ onSuccess }: PasswordGateProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { toast } = useToast();
  const correctPassword = 'VKP@CTW';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      setError('');
      toast({
        title: 'Access Granted',
        description: 'Welcome to the research dashboard.',
      });
      onSuccess();
    } else {
      setError('Incorrect password. Please try again.');
      toast({
        variant: 'destructive',
        title: 'Access Denied',
        description: 'The password you entered is incorrect.',
      });
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <Card className="w-full max-w-sm shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex justify-center">
            <Lock className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="font-headline text-2xl">Access Required</CardTitle>
          <CardDescription>
            Please enter the password to access the application features.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter password"
              />
            </div>
            {error && <p className="text-sm font-medium text-destructive">{error}</p>}
            <Button type="submit" className="w-full">
              Unlock Features
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

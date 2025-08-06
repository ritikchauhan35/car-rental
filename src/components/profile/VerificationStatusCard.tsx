import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';

interface VerificationStatusCardProps {
  currentUser: FirebaseUser | null;
}

export const VerificationStatusCard = ({ currentUser }: VerificationStatusCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Verification Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm">Email verified</span>
          <Badge variant={currentUser?.emailVerified ? "default" : "destructive"}>
            {currentUser?.emailVerified ? "Verified" : "Pending"}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm">Phone verified</span>
          <Badge variant="destructive">Pending</Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm">Identity verified</span>
          <Badge variant="destructive">Pending</Badge>
        </div>

        <Button variant="outline" size="sm" className="w-full mt-4">
          Complete Verification
        </Button>
      </CardContent>
    </Card>
  );
};
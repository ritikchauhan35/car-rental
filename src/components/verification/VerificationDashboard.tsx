import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Clock, Shield, User, Car } from 'lucide-react';
import { VerificationStatus } from '@/types/verification';

interface VerificationDashboardProps {
  verification: VerificationStatus;
  userRole: 'customer' | 'owner';
  onStartVerification: (type: 'personal' | 'vehicle') => void;
}

export const VerificationDashboard = ({ 
  verification, 
  userRole, 
  onStartVerification 
}: VerificationDashboardProps) => {
  const getProgressPercentage = () => {
    const personalComplete = verification.personal.status === 'verified' ? 50 : 0;
    const vehicleComplete = userRole === 'owner' && verification.vehicle?.status === 'verified' ? 50 : 0;
    return personalComplete + vehicleComplete;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'pending':
      case 'partial':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-100 text-green-800">Verified</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'partial':
        return <Badge variant="outline">Partial</Badge>;
      default:
        return <Badge variant="outline">Not Started</Badge>;
    }
  };

  const overallProgress = getProgressPercentage();
  const isFullyVerified = verification.personal.status === 'verified' && 
    (userRole === 'customer' || verification.vehicle?.status === 'verified');

  return (
    <div className="space-y-6">
      {/* Overall Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Verification Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-muted-foreground">{overallProgress}% Complete</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
            
            {isFullyVerified && (
              <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-green-800">
                  Your account is fully verified!
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Personal Verification */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Verification
            </div>
            {getStatusBadge(verification.personal.status)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Identity Documents</span>
              {getStatusIcon(verification.personal.status)}
            </div>
            
            <p className="text-sm text-muted-foreground">
              {verification.personal.status === 'verified' 
                ? 'Your identity has been successfully verified.'
                : 'Upload your government ID and take a selfie to verify your identity.'
              }
            </p>

            {verification.personal.status !== 'verified' && (
              <Button 
                onClick={() => onStartVerification('personal')}
                className="w-full"
              >
                {verification.personal.status === 'pending' ? 'View Documents' : 'Start Verification'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Vehicle Verification (for owners) */}
      {userRole === 'owner' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Car className="h-5 w-5" />
                Vehicle Owner Verification
              </div>
              {getStatusBadge(verification.vehicle?.status || 'pending')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Vehicle Documents</span>
                {getStatusIcon(verification.vehicle?.status || 'pending')}
              </div>
              
              <p className="text-sm text-muted-foreground">
                {verification.vehicle?.status === 'verified'
                  ? 'Your vehicle ownership has been verified.'
                  : 'Upload vehicle registration, insurance, and inspection documents.'
                }
              </p>

              {verification.vehicle?.status !== 'verified' && (
                <Button 
                  onClick={() => onStartVerification('vehicle')}
                  variant="outline"
                  className="w-full"
                >
                  {verification.vehicle?.status === 'pending' ? 'View Documents' : 'Start Verification'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
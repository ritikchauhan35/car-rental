import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { BookingRequest as BookingRequestType } from '@/types/verification';
import { Calendar, MapPin, User, FileText, MessageCircle, CheckCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';

interface BookingRequestProps {
  booking: BookingRequestType;
  onApprove: (bookingId: string) => Promise<void>;
  onReject: (bookingId: string, reason: string) => Promise<void>;
  isOwner?: boolean;
}

export const BookingRequestCard = ({ 
  booking, 
  onApprove, 
  onReject, 
  isOwner = false 
}: BookingRequestProps) => {
  const [loading, setLoading] = useState<'approve' | 'reject' | null>(null);
  const { toast } = useToast();

  const handleApprove = async () => {
    setLoading('approve');
    try {
      await onApprove(booking.id);
      toast({
        title: "Booking approved",
        description: "The booking request has been approved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve booking.",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  const handleReject = async () => {
    setLoading('reject');
    try {
      await onReject(booking.id, "Owner declined");
      toast({
        title: "Booking rejected",
        description: "The booking request has been rejected.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject booking.",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  const getStatusBadge = () => {
    switch (booking.status) {
      case 'pending':
        return <Badge variant="secondary">Pending Review</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      case 'completed':
        return <Badge variant="outline">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="outline">Cancelled</Badge>;
      default:
        return null;
    }
  };

  const tripDuration = Math.ceil(
    (booking.endDate.getTime() - booking.startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Booking Request</CardTitle>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Customer Info */}
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback>
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">Customer Request</p>
            <p className="text-sm text-muted-foreground">ID: {booking.customerId}</p>
          </div>
        </div>

        <Separator />

        {/* Trip Details */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {format(booking.startDate, 'MMM dd, yyyy')} - {format(booking.endDate, 'MMM dd, yyyy')}
              <span className="text-muted-foreground ml-2">({tripDuration} days)</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Pickup location to be confirmed</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Total Amount:</span>
            <span className="text-lg font-bold">${booking.totalAmount}</span>
          </div>
        </div>

        {/* Customer Message */}
        {booking.message && (
          <>
            <Separator />
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Customer Message</span>
              </div>
              <p className="text-sm bg-muted p-3 rounded-lg">{booking.message}</p>
            </div>
          </>
        )}

        {/* Documents Status */}
        <Separator />
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Customer Documents</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {booking.customerDocuments.map((doc) => (
              <div key={doc.id} className="flex items-center gap-2 text-xs">
                {doc.status === 'verified' ? (
                  <CheckCircle className="h-3 w-3 text-green-600" />
                ) : (
                  <XCircle className="h-3 w-3 text-red-600" />
                )}
                <span className="capitalize">{doc.type.replace('_', ' ')}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions for Owners */}
        {isOwner && booking.status === 'pending' && (
          <>
            <Separator />
            <div className="flex gap-2">
              <Button 
                onClick={handleApprove}
                disabled={loading !== null}
                className="flex-1"
              >
                {loading === 'approve' ? 'Approving...' : 'Approve Booking'}
              </Button>
              <Button 
                variant="outline"
                onClick={handleReject}
                disabled={loading !== null}
                className="flex-1"
              >
                {loading === 'reject' ? 'Rejecting...' : 'Reject'}
              </Button>
            </div>
          </>
        )}

        <div className="text-xs text-muted-foreground">
          Requested on {format(booking.requestedAt, 'MMM dd, yyyy HH:mm')}
        </div>
      </CardContent>
    </Card>
  );
};
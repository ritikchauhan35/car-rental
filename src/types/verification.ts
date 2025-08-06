export interface Document {
  id: string;
  type: 'id_card' | 'drivers_license' | 'passport' | 'vehicle_registration' | 'insurance' | 'selfie';
  url: string;
  status: 'pending' | 'verified' | 'rejected';
  uploadedAt: Date;
  verifiedAt?: Date;
  rejectionReason?: string;
}

export interface VerificationStatus {
  personal: {
    status: 'pending' | 'partial' | 'verified' | 'rejected';
    documents: Document[];
    lastUpdated: Date;
  };
  vehicle?: {
    status: 'pending' | 'partial' | 'verified' | 'rejected';
    documents: Document[];
    lastUpdated: Date;
  };
}

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  role: 'customer' | 'owner' | 'admin';
  verification: VerificationStatus;
  trustScore: number;
  createdAt: Date;
}

export interface VehicleDocument {
  id: string;
  vehicleId: string;
  type: 'registration' | 'insurance' | 'inspection';
  url: string;
  status: 'pending' | 'verified' | 'rejected';
  expiryDate?: Date;
  uploadedAt: Date;
}

export interface BookingRequest {
  id: string;
  vehicleId: string;
  customerId: string;
  ownerId: string;
  startDate: Date;
  endDate: Date;
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';
  totalAmount: number;
  customerDocuments: Document[];
  requestedAt: Date;
  message?: string;
}
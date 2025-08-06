import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { VerificationDashboard } from '@/components/verification/VerificationDashboard';
import { VerificationStatus } from '@/types/verification';
import { useNavigate } from 'react-router-dom';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileForm } from '@/components/profile/ProfileForm';
import { ProfileStats } from '@/components/profile/ProfileStats';
import { VerificationStatusCard } from '@/components/profile/VerificationStatusCard';

export const Profile = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Mock verification status - in real app, this would come from Firestore
  const [verificationStatus] = useState<VerificationStatus>({
    personal: {
      status: 'pending',
      documents: [],
      lastUpdated: new Date(),
    },
    vehicle: {
      status: 'pending',
      documents: [],
      lastUpdated: new Date(),
    },
  });

  const handleStartVerification = (type: 'personal' | 'vehicle') => {
    if (type === 'personal') {
      navigate('/verification/personal');
    } else {
      navigate('/verification/vehicle');
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Header */}
          <ProfileHeader currentUser={currentUser} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Verification Dashboard */}
            <div className="lg:col-span-2 space-y-6">
              <VerificationDashboard 
                verification={verificationStatus}
                userRole="customer" // In real app, get from user profile
                onStartVerification={handleStartVerification}
              />
              
              {/* Profile Form */}
              <ProfileForm currentUser={currentUser} />
            </div>

            {/* Profile Stats */}
            <div className="space-y-6">
              <ProfileStats />
              <VerificationStatusCard currentUser={currentUser} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
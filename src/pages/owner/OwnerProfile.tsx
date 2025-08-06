import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { User, Mail, Phone, MapPin, Calendar, Star, Shield, Car, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

export const OwnerProfile = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: currentUser?.displayName || '',
    email: currentUser?.email || '',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Experienced vehicle owner with a passion for providing excellent rental experiences.',
    businessName: 'SF Premium Rentals',
    taxId: '12-3456789',
    bankAccount: '****1234',
    instantBooking: true,
    weekendPricing: true,
    autoAcceptBookings: false,
    requireDeposit: true,
    allowPetFriendly: true,
    minimumRentalDays: 1,
    maximumRentalDays: 30,
    advanceNotice: 2, // hours
    cancellationPolicy: 'moderate'
  });

  const handleSave = async () => {
    setLoading(true);
    try {
      // In a real app, this would update the owner profile in Firestore
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Profile updated successfully!",
        description: "Your owner profile has been updated.",
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description: "There was an error updating your profile.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const ownerStats = {
    totalEarnings: 15420,
    totalBookings: 87,
    averageRating: 4.8,
    responseRate: 98,
    activeVehicles: 4,
    completionRate: 96
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={currentUser?.photoURL || ''} alt={currentUser?.displayName || 'Owner'} />
                <AvatarFallback className="text-2xl">
                  {currentUser?.displayName?.charAt(0) || currentUser?.email?.charAt(0) || 'O'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold">Owner Profile</h1>
                <p className="text-muted-foreground">Manage your business settings and preferences</p>
              </div>
            </div>
            <Button asChild variant="outline">
              <Link to="/owner/dashboard">
                Back to Dashboard
              </Link>
            </Button>
          </div>

          {/* Owner Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">${ownerStats.totalEarnings.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Earnings</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">{ownerStats.totalBookings}</div>
                <div className="text-sm text-muted-foreground">Total Bookings</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">{ownerStats.averageRating}</div>
                <div className="text-sm text-muted-foreground">Avg Rating</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <User className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">{ownerStats.responseRate}%</div>
                <div className="text-sm text-muted-foreground">Response Rate</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Car className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">{ownerStats.activeVehicles}</div>
                <div className="text-sm text-muted-foreground">Active Vehicles</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">{ownerStats.completionRate}%</div>
                <div className="text-sm text-muted-foreground">Completion Rate</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="displayName">Full Name</Label>
                    <Input
                      id="displayName"
                      value={profileData.displayName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, displayName: e.target.value }))}
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        className="pl-10"
                        disabled
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="Enter your phone number"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="Enter your city"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                      placeholder="Tell us about yourself..."
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Business Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Business Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input
                      id="businessName"
                      value={profileData.businessName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, businessName: e.target.value }))}
                      placeholder="Enter your business name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="taxId">Tax ID / EIN</Label>
                    <Input
                      id="taxId"
                      value={profileData.taxId}
                      onChange={(e) => setProfileData(prev => ({ ...prev, taxId: e.target.value }))}
                      placeholder="Enter your tax ID"
                    />
                  </div>

                  <div>
                    <Label htmlFor="bankAccount">Bank Account</Label>
                    <Input
                      id="bankAccount"
                      value={profileData.bankAccount}
                      onChange={(e) => setProfileData(prev => ({ ...prev, bankAccount: e.target.value }))}
                      placeholder="Bank account ending in..."
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Rental Settings */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Rental Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="instantBooking">Instant Booking</Label>
                      <p className="text-sm text-muted-foreground">Allow guests to book without approval</p>
                    </div>
                    <Switch
                      id="instantBooking"
                      checked={profileData.instantBooking}
                      onCheckedChange={(checked) => setProfileData(prev => ({ ...prev, instantBooking: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="weekendPricing">Weekend Pricing</Label>
                      <p className="text-sm text-muted-foreground">Automatically increase prices on weekends</p>
                    </div>
                    <Switch
                      id="weekendPricing"
                      checked={profileData.weekendPricing}
                      onCheckedChange={(checked) => setProfileData(prev => ({ ...prev, weekendPricing: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="autoAcceptBookings">Auto Accept Bookings</Label>
                      <p className="text-sm text-muted-foreground">Automatically accept all booking requests</p>
                    </div>
                    <Switch
                      id="autoAcceptBookings"
                      checked={profileData.autoAcceptBookings}
                      onCheckedChange={(checked) => setProfileData(prev => ({ ...prev, autoAcceptBookings: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="requireDeposit">Require Security Deposit</Label>
                      <p className="text-sm text-muted-foreground">Collect security deposit for all bookings</p>
                    </div>
                    <Switch
                      id="requireDeposit"
                      checked={profileData.requireDeposit}
                      onCheckedChange={(checked) => setProfileData(prev => ({ ...prev, requireDeposit: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="allowPetFriendly">Allow Pet-Friendly Vehicles</Label>
                      <p className="text-sm text-muted-foreground">Allow pets in your vehicles</p>
                    </div>
                    <Switch
                      id="allowPetFriendly"
                      checked={profileData.allowPetFriendly}
                      onCheckedChange={(checked) => setProfileData(prev => ({ ...prev, allowPetFriendly: checked }))}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Rental Policies</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="minimumRentalDays">Minimum Rental (days)</Label>
                      <Input
                        id="minimumRentalDays"
                        type="number"
                        min="1"
                        max="30"
                        value={profileData.minimumRentalDays}
                        onChange={(e) => setProfileData(prev => ({ ...prev, minimumRentalDays: parseInt(e.target.value) }))}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="maximumRentalDays">Maximum Rental (days)</Label>
                      <Input
                        id="maximumRentalDays"
                        type="number"
                        min="1"
                        max="365"
                        value={profileData.maximumRentalDays}
                        onChange={(e) => setProfileData(prev => ({ ...prev, maximumRentalDays: parseInt(e.target.value) }))}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="advanceNotice">Advance Notice (hours)</Label>
                    <Input
                      id="advanceNotice"
                      type="number"
                      min="0"
                      max="168"
                      value={profileData.advanceNotice}
                      onChange={(e) => setProfileData(prev => ({ ...prev, advanceNotice: parseInt(e.target.value) }))}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Verification Status</CardTitle>
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
                    <Badge variant="default">Verified</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Identity verified</span>
                    <Badge variant="default">Verified</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Business verified</span>
                    <Badge variant="default">Verified</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={loading} size="lg">
              {loading ? "Saving..." : "Save All Changes"}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Phone, MapPin } from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';

interface ProfileFormProps {
  currentUser: FirebaseUser | null;
}

export const ProfileForm = ({ currentUser }: ProfileFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: currentUser?.displayName || '',
    email: currentUser?.email || '',
    phone: '',
    location: '',
    bio: '',
  });

  const handleSave = async () => {
    setLoading(true);
    try {
      // In a real app, this would update the user profile in Firestore
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>

        <div>
          <Label htmlFor="bio">Bio</Label>
          <textarea
            id="bio"
            value={profileData.bio}
            onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
            placeholder="Tell us about yourself..."
            className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm resize-none"
            rows={4}
          />
        </div>

        <Button onClick={handleSave} disabled={loading} className="w-full md:w-auto">
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </CardContent>
    </Card>
  );
};
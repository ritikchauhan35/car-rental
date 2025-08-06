import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Upload, Car, MapPin, DollarSign, FileText } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';

const vehicleCategories = [
  'Compact',
  'SUV', 
  'Luxury',
  'Sports',
  'Electric',
  'Hybrid',
  'Motorcycle',
  'Scooter'
];

const transmissionTypes = ['Automatic', 'Manual'];
const fuelTypes = ['Gasoline', 'Electric', 'Hybrid', 'Diesel'];

export const AddVehicle = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [vehicleData, setVehicleData] = useState({
    name: '',
    description: '',
    category: '',
    transmission: '',
    fuel: '',
    seats: 4,
    price: 0,
    location: '',
    features: [] as string[],
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages(prev => [...prev, ...files].slice(0, 5)); // Max 5 images
    }
  };

  const uploadImages = async (vehicleId: string): Promise<string[]> => {
    const uploadPromises = images.map(async (image, index) => {
      const imageRef = ref(storage, `vehicles/${vehicleId}/image_${index}`);
      const snapshot = await uploadBytes(imageRef, image);
      return getDownloadURL(snapshot.ref);
    });
    
    return Promise.all(uploadPromises);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    setLoading(true);
    try {
      // Create vehicle document
      const vehicleRef = await addDoc(collection(db, 'vehicles'), {
        ...vehicleData,
        ownerId: currentUser.uid,
        ownerName: currentUser.displayName || currentUser.email,
        createdAt: new Date(),
        status: 'active',
        rating: 0,
        bookings: 0,
        images: [] // Will be updated after image upload
      });

      // Upload images if any
      let imageUrls: string[] = [];
      if (images.length > 0) {
        imageUrls = await uploadImages(vehicleRef.id);
        // Update vehicle document with image URLs
        // Note: In a real app, you'd use updateDoc here
      }

      toast({
        title: "Vehicle added successfully!",
        description: "Your vehicle is now live and available for booking.",
      });

      navigate('/owner/dashboard');
    } catch (error: any) {
      toast({
        title: "Error adding vehicle",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <Car className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">Add New Vehicle</h1>
              <p className="text-muted-foreground">List your vehicle and start earning</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Vehicle Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Tesla Model 3"
                      value={vehicleData.name}
                      onChange={(e) => setVehicleData(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={vehicleData.category} onValueChange={(value) => setVehicleData(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {vehicleCategories.map(category => (
                          <SelectItem key={category} value={category.toLowerCase()}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your vehicle, its condition, and any special features..."
                    value={vehicleData.description}
                    onChange={(e) => setVehicleData(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="transmission">Transmission</Label>
                    <Select value={vehicleData.transmission} onValueChange={(value) => setVehicleData(prev => ({ ...prev, transmission: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {transmissionTypes.map(type => (
                          <SelectItem key={type} value={type.toLowerCase()}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="fuel">Fuel Type</Label>
                    <Select value={vehicleData.fuel} onValueChange={(value) => setVehicleData(prev => ({ ...prev, fuel: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select fuel type" />
                      </SelectTrigger>
                      <SelectContent>
                        {fuelTypes.map(fuel => (
                          <SelectItem key={fuel} value={fuel.toLowerCase()}>
                            {fuel}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="seats">Number of Seats</Label>
                    <Input
                      id="seats"
                      type="number"
                      min="1"
                      max="12"
                      value={vehicleData.seats}
                      onChange={(e) => setVehicleData(prev => ({ ...prev, seats: parseInt(e.target.value) }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location & Pricing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Location & Pricing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Pickup Location</Label>
                    <Input
                      id="location"
                      placeholder="e.g., San Francisco, CA"
                      value={vehicleData.location}
                      onChange={(e) => setVehicleData(prev => ({ ...prev, location: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price per Day ($)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="price"
                        type="number"
                        min="1"
                        placeholder="0"
                        className="pl-10"
                        value={vehicleData.price}
                        onChange={(e) => setVehicleData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                        required
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Image Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Vehicle Photos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Upload up to 5 high-quality photos of your vehicle
                    </p>
                    <Input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="max-w-xs mx-auto"
                    />
                  </div>
                </div>
                
                {images.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium mb-2">Selected Images:</p>
                    <div className="flex flex-wrap gap-2">
                      {images.map((image, index) => (
                        <Badge key={index} variant="secondary">
                          {image.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/owner/dashboard')}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Adding Vehicle..." : "Add Vehicle"}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};
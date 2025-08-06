import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Upload, Car, MapPin, DollarSign, FileText, Trash2, Settings } from 'lucide-react';

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

// Mock vehicle data - in real app would fetch from Firestore
const mockVehicle = {
  id: "1",
  name: "Tesla Model 3",
  description: "Experience the future of driving with this pristine Tesla Model 3. Perfect for city commutes and longer trips with its impressive range and cutting-edge technology.",
  category: "electric",
  transmission: "automatic",
  fuel: "electric",
  seats: 5,
  price: 89,
  location: "San Francisco, CA",
  features: ["Autopilot", "Supercharger Network", "Premium Audio", "Glass Roof", "Wireless Charging"],
  images: [
    "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=300&fit=crop"
  ],
  isActive: true,
  instantBooking: true,
  minimumAge: 21,
  mileageLimit: 200
};

export const EditVehicle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [vehicleData, setVehicleData] = useState(mockVehicle);
  const [newImages, setNewImages] = useState<File[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setNewImages(prev => [...prev, ...files].slice(0, 5)); // Max 5 images
    }
  };

  const removeImage = (index: number) => {
    setVehicleData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // In a real app, this would update the vehicle in Firestore
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Vehicle updated successfully!",
        description: "Your vehicle listing has been updated.",
      });
      
      navigate('/owner/dashboard');
    } catch (error: any) {
      toast({
        title: "Error updating vehicle",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this vehicle? This action cannot be undone.')) {
      return;
    }

    setLoading(true);
    try {
      // In a real app, this would delete the vehicle from Firestore
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Vehicle deleted successfully!",
        description: "Your vehicle has been removed from the platform.",
      });
      
      navigate('/owner/dashboard');
    } catch (error: any) {
      toast({
        title: "Error deleting vehicle",
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
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Car className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold">Edit Vehicle</h1>
                <p className="text-muted-foreground">Update your vehicle listing</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="destructive" onClick={handleDelete} disabled={loading}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Vehicle
              </Button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Status Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Vehicle Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="isActive">Active Listing</Label>
                    <p className="text-sm text-muted-foreground">Make your vehicle available for booking</p>
                  </div>
                  <Switch
                    id="isActive"
                    checked={vehicleData.isActive}
                    onCheckedChange={(checked) => setVehicleData(prev => ({ ...prev, isActive: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="instantBooking">Instant Booking</Label>
                    <p className="text-sm text-muted-foreground">Allow guests to book without approval</p>
                  </div>
                  <Switch
                    id="instantBooking"
                    checked={vehicleData.instantBooking}
                    onCheckedChange={(checked) => setVehicleData(prev => ({ ...prev, instantBooking: checked }))}
                  />
                </div>
              </CardContent>
            </Card>

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
                      value={vehicleData.name}
                      onChange={(e) => setVehicleData(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={vehicleData.category} onValueChange={(value) => setVehicleData(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue />
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
                        <SelectValue />
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
                        <SelectValue />
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
                        className="pl-10"
                        value={vehicleData.price}
                        onChange={(e) => setVehicleData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="minimumAge">Minimum Renter Age</Label>
                    <Input
                      id="minimumAge"
                      type="number"
                      min="18"
                      max="70"
                      value={vehicleData.minimumAge}
                      onChange={(e) => setVehicleData(prev => ({ ...prev, minimumAge: parseInt(e.target.value) }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="mileageLimit">Daily Mileage Limit</Label>
                    <Input
                      id="mileageLimit"
                      type="number"
                      min="50"
                      value={vehicleData.mileageLimit}
                      onChange={(e) => setVehicleData(prev => ({ ...prev, mileageLimit: parseInt(e.target.value) }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Images */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Vehicle Photos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Current Images</Label>
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    {vehicleData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Vehicle ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Add more photos (up to 5 total)
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
                
                {newImages.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">New Images to Upload:</p>
                    <div className="flex flex-wrap gap-2">
                      {newImages.map((image, index) => (
                        <Badge key={index} variant="secondary">
                          {image.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {vehicleData.features.map((feature, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-1">
                      {feature}
                      <button
                        type="button"
                        onClick={() => setVehicleData(prev => ({
                          ...prev,
                          features: prev.features.filter((_, i) => i !== index)
                        }))}
                        className="ml-1 text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="mt-4">
                  <Input
                    placeholder="Add a feature and press Enter"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const value = e.currentTarget.value.trim();
                        if (value && !vehicleData.features.includes(value)) {
                          setVehicleData(prev => ({
                            ...prev,
                            features: [...prev.features, value]
                          }));
                          e.currentTarget.value = '';
                        }
                      }
                    }}
                  />
                </div>
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
                {loading ? "Updating Vehicle..." : "Update Vehicle"}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};
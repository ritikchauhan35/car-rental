import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Star, 
  MapPin, 
  Users, 
  Car, 
  Shield, 
  Calendar,
  DollarSign,
  ArrowLeft,
  Fuel,
  Settings
} from 'lucide-react';

// Mock data - in a real app this would come from Firestore
const mockVehicle = {
  id: "1",
  name: "Tesla Model 3",
  image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop",
  images: [
    "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&h=600&fit=crop"
  ],
  price: 89,
  rating: 4.9,
  reviews: 127,
  location: "San Francisco, CA",
  seats: 5,
  category: "Electric",
  transmission: "Automatic",
  fuel: "Electric",
  description: "Experience the future of driving with this pristine Tesla Model 3. Perfect for city commutes and longer trips with its impressive range and cutting-edge technology.",
  features: [
    "Autopilot",
    "Supercharger Network",
    "Premium Audio",
    "Glass Roof",
    "Wireless Charging"
  ],
  owner: {
    name: "John Smith",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    rating: 4.8,
    trips: 89,
    responseTime: "Usually responds within an hour"
  }
};

export const VehicleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);

  const calculateTotal = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return days * mockVehicle.price;
  };

  const handleBooking = async () => {
    if (!currentUser) {
      navigate('/auth/signin', { state: { from: { pathname: `/vehicle/${id}` } } });
      return;
    }

    if (!startDate || !endDate) {
      toast({
        title: "Please select dates",
        description: "Both start and end dates are required for booking.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // In a real app, this would create a booking in Firestore
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      toast({
        title: "Booking confirmed!",
        description: "Your vehicle has been booked successfully. Check your email for details.",
      });
      
      navigate('/owner/dashboard'); // In real app, navigate to bookings page
    } catch (error) {
      toast({
        title: "Booking failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const total = calculateTotal();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Vehicle Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-4">
                <div className="aspect-video rounded-lg overflow-hidden">
                  <img
                    src={mockVehicle.images[selectedImage]}
                    alt={mockVehicle.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto">
                  {mockVehicle.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        selectedImage === index ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${mockVehicle.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Vehicle Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl">{mockVehicle.name}</CardTitle>
                      <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm">{mockVehicle.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{mockVehicle.rating} ({mockVehicle.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold">${mockVehicle.price}</div>
                      <div className="text-sm text-muted-foreground">per day</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Vehicle Specs */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{mockVehicle.seats} seats</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Settings className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{mockVehicle.transmission}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Fuel className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{mockVehicle.fuel}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Car className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{mockVehicle.category}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground">{mockVehicle.description}</p>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="font-semibold mb-2">Features</h3>
                    <div className="flex flex-wrap gap-2">
                      {mockVehicle.features.map((feature, index) => (
                        <Badge key={index} variant="secondary">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Owner Info */}
                  <div>
                    <h3 className="font-semibold mb-3">Vehicle Owner</h3>
                    <div className="flex items-center gap-3 p-4 rounded-lg border">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={mockVehicle.owner.avatar} alt={mockVehicle.owner.name} />
                        <AvatarFallback>
                          {mockVehicle.owner.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">{mockVehicle.owner.name}</div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>{mockVehicle.owner.rating} rating</span>
                          </div>
                          <span>{mockVehicle.owner.trips} trips</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {mockVehicle.owner.responseTime}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="sticky top-24"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Book This Vehicle
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input
                      id="start-date"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="end-date">End Date</Label>
                    <Input
                      id="end-date"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      min={startDate || new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  {total > 0 && (
                    <div className="space-y-2 pt-4 border-t">
                      <div className="flex justify-between text-sm">
                        <span>Price per day</span>
                        <span>${mockVehicle.price}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Number of days</span>
                        <span>{Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24))}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${total}</span>
                      </div>
                    </div>
                  )}

                  <Button 
                    onClick={handleBooking}
                    disabled={loading || !startDate || !endDate}
                    className="w-full"
                    size="lg"
                  >
                    {loading ? "Processing..." : currentUser ? "Book Now" : "Sign in to Book"}
                  </Button>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    <span>Protected by comprehensive insurance</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
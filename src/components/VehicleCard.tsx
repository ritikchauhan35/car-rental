import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Users, Car } from "lucide-react";
import { Link } from "react-router-dom";

interface Vehicle {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  location: string;
  seats: number;
  category: string;
  transmission: "Automatic" | "Manual";
  fuel: string;
}

interface VehicleCardProps {
  vehicle: Vehicle;
}

export const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      <CardContent className="p-0">
        <div className="aspect-video relative">
          <img
            src={vehicle.image}
            alt={vehicle.name}
            className="w-full h-full object-cover"
          />
          <Badge className="absolute top-3 left-3 bg-white/90 text-black hover:bg-white">
            {vehicle.category}
          </Badge>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-lg">{vehicle.name}</h3>
            <div className="text-right">
              <div className="font-bold text-lg">${vehicle.price}</div>
              <div className="text-xs text-muted-foreground">per day</div>
            </div>
          </div>
          
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{vehicle.rating}</span>
            <span className="text-muted-foreground mx-2">•</span>
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{vehicle.location}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{vehicle.seats} seats</span>
              </div>
              <div className="flex items-center gap-1">
                <Car className="h-4 w-4" />
                <span>{vehicle.transmission}</span>
              </div>
            </div>
          </div>
          
          <Button className="w-full" size="sm" asChild>
            <Link to={`/vehicle/${vehicle.id}`}>
              View Details
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
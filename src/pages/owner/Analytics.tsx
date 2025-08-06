import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Car, 
  Calendar, 
  Star,
  Users,
  MapPin,
  Clock,
  BarChart3
} from 'lucide-react';
import { Link } from 'react-router-dom';

const monthlyData = [
  { month: 'Jan', earnings: 1200, bookings: 8, avgRating: 4.7 },
  { month: 'Feb', earnings: 1800, bookings: 12, avgRating: 4.8 },
  { month: 'Mar', earnings: 2400, bookings: 16, avgRating: 4.9 },
  { month: 'Apr', earnings: 1950, bookings: 13, avgRating: 4.8 },
  { month: 'May', earnings: 2800, bookings: 18, avgRating: 4.9 },
  { month: 'Jun', earnings: 3200, bookings: 22, avgRating: 4.9 }
];

const vehiclePerformance = [
  {
    name: "Tesla Model 3",
    earnings: 1580,
    bookings: 12,
    rating: 4.9,
    utilizationRate: 78,
    trend: "up"
  },
  {
    name: "BMW X5", 
    earnings: 1320,
    bookings: 8,
    rating: 4.8,
    utilizationRate: 65,
    trend: "up"
  },
  {
    name: "Honda Civic",
    earnings: 890,
    bookings: 15,
    rating: 4.6,
    utilizationRate: 82,
    trend: "down"
  },
  {
    name: "Mercedes C-Class",
    earnings: 1050,
    bookings: 6,
    rating: 4.7,
    utilizationRate: 58,
    trend: "stable"
  }
];

const topLocations = [
  { location: "San Francisco Airport", bookings: 18, revenue: 1620 },
  { location: "Downtown LA", bookings: 12, revenue: 1080 },
  { location: "Times Square", bookings: 8, revenue: 720 },
  { location: "Miami Beach", bookings: 6, revenue: 540 }
];

export const Analytics = () => {
  const totalEarnings = monthlyData.reduce((sum, month) => sum + month.earnings, 0);
  const totalBookings = monthlyData.reduce((sum, month) => sum + month.bookings, 0);
  const avgRating = monthlyData.reduce((sum, month) => sum + month.avgRating, 0) / monthlyData.length;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Track your performance and optimize your earnings</p>
          </div>
          <div className="flex items-center gap-4">
            <Select defaultValue="6months">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button asChild>
              <Link to="/owner/dashboard">
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Earnings</p>
                  <p className="text-2xl font-bold">${totalEarnings.toLocaleString()}</p>
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    <span>+12.5%</span>
                  </div>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Bookings</p>
                  <p className="text-2xl font-bold">{totalBookings}</p>
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    <span>+8.2%</span>
                  </div>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                  <p className="text-2xl font-bold">{avgRating.toFixed(1)}</p>
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    <span>+0.2</span>
                  </div>
                </div>
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Utilization</p>
                  <p className="text-2xl font-bold">71%</p>
                  <div className="flex items-center text-sm text-red-600">
                    <TrendingDown className="mr-1 h-3 w-3" />
                    <span>-2.1%</span>
                  </div>
                </div>
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Monthly Performance Chart Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Monthly Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyData.map((month, index) => (
                    <div key={month.month} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium">{month.month}</span>
                        </div>
                        <div>
                          <div className="font-medium">${month.earnings}</div>
                          <div className="text-sm text-muted-foreground">{month.bookings} bookings</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{month.avgRating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Vehicle Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Vehicle Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vehiclePerformance.map((vehicle, index) => (
                    <div key={vehicle.name} className="p-4 rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{vehicle.name}</div>
                        <Badge variant={vehicle.trend === 'up' ? 'default' : vehicle.trend === 'down' ? 'destructive' : 'secondary'}>
                          {vehicle.trend === 'up' && <TrendingUp className="h-3 w-3 mr-1" />}
                          {vehicle.trend === 'down' && <TrendingDown className="h-3 w-3 mr-1" />}
                          {vehicle.trend}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Earnings: </span>
                          <span className="font-medium">${vehicle.earnings}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Bookings: </span>
                          <span className="font-medium">{vehicle.bookings}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Rating: </span>
                          <span className="font-medium">{vehicle.rating}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Utilization: </span>
                          <span className="font-medium">{vehicle.utilizationRate}%</span>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${vehicle.utilizationRate}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Top Pickup Locations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Top Pickup Locations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topLocations.map((location, index) => (
                    <div key={location.location} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium">#{index + 1}</span>
                        </div>
                        <div>
                          <div className="font-medium">{location.location}</div>
                          <div className="text-sm text-muted-foreground">{location.bookings} bookings</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${location.revenue}</div>
                        <div className="text-sm text-muted-foreground">revenue</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Quick Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-2 text-green-700 dark:text-green-400 mb-2">
                      <TrendingUp className="h-4 w-4" />
                      <span className="font-medium">Peak Season</span>
                    </div>
                    <p className="text-sm text-green-600 dark:text-green-300">
                      June shows highest earnings with 22 bookings. Consider increasing rates during peak times.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 mb-2">
                      <Star className="h-4 w-4" />
                      <span className="font-medium">Top Performer</span>
                    </div>
                    <p className="text-sm text-blue-600 dark:text-blue-300">
                      Tesla Model 3 has the highest rating (4.9) and utilization rate (78%).
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                    <div className="flex items-center gap-2 text-yellow-700 dark:text-yellow-400 mb-2">
                      <Clock className="h-4 w-4" />
                      <span className="font-medium">Optimization Tip</span>
                    </div>
                    <p className="text-sm text-yellow-600 dark:text-yellow-300">
                      Mercedes C-Class has low utilization (58%). Consider adjusting pricing or availability.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
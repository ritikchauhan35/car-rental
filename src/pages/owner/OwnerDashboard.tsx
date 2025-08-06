import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DollarSign, 
  Car, 
  Calendar, 
  Star, 
  Plus, 
  Edit, 
  MoreHorizontal,
  TrendingUp,
  Users
} from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  {
    title: "Total Earnings",
    value: "$3,240",
    change: "+12.5%",
    icon: DollarSign,
    color: "text-green-600"
  },
  {
    title: "Active Vehicles",
    value: "4",
    change: "+1",
    icon: Car,
    color: "text-blue-600"
  },
  {
    title: "Bookings This Month",
    value: "18",
    change: "+25%",
    icon: Calendar,
    color: "text-purple-600"
  },
  {
    title: "Average Rating",
    value: "4.8",
    change: "+0.2",
    icon: Star,
    color: "text-yellow-600"
  }
];

const recentBookings = [
  {
    id: "1",
    customer: "John Doe",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
    vehicle: "Tesla Model 3",
    dates: "Jan 15-18, 2024",
    amount: "$267",
    status: "confirmed"
  },
  {
    id: "2",
    customer: "Jane Smith",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
    vehicle: "BMW X5",
    dates: "Jan 20-22, 2024",
    amount: "$360",
    status: "pending"
  },
  {
    id: "3",
    customer: "Mike Johnson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
    vehicle: "Honda Civic",
    dates: "Jan 25-27, 2024",
    amount: "$135",
    status: "completed"
  }
];

const myVehicles = [
  {
    id: "1",
    name: "Tesla Model 3",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=80&h=80&fit=crop",
    status: "Active",
    bookings: 12,
    earnings: "$1,068",
    rating: 4.9
  },
  {
    id: "2",
    name: "BMW X5",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=80&h=80&fit=crop",
    status: "Booked",
    bookings: 8,
    earnings: "$960",
    rating: 4.8
  },
  {
    id: "3",
    name: "Honda Civic",
    image: "https://images.unsplash.com/photo-1619976215607-a4b7c0bb05f4?w=80&h=80&fit=crop",
    status: "Active",
    bookings: 15,
    earnings: "$675",
    rating: 4.6
  },
  {
    id: "4",
    name: "Mercedes C-Class",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=80&h=80&fit=crop",
    status: "Maintenance",
    bookings: 6,
    earnings: "$570",
    rating: 4.7
  }
];

export const OwnerDashboard = () => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "booked":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "maintenance":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

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
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Manage your vehicles and track your earnings</p>
          </div>
          <Button asChild>
            <Link to="/owner/add-vehicle">
              <Plus className="mr-2 h-4 w-4" />
              Add Vehicle
            </Link>
          </Button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <div className="flex items-center text-sm">
                        <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
                        <span className="text-green-600">{stat.change}</span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-full bg-muted ${stat.color}`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="vehicles">My Vehicles</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Bookings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Recent Bookings
                      <Button variant="ghost" size="sm" asChild>
                        <Link to="/owner/bookings">View All</Link>
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentBookings.map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between p-3 rounded-lg border">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={booking.avatar} alt={booking.customer} />
                              <AvatarFallback>
                                {booking.customer.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{booking.customer}</p>
                              <p className="text-sm text-muted-foreground">{booking.vehicle}</p>
                              <p className="text-xs text-muted-foreground">{booking.dates}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{booking.amount}</p>
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full justify-start" asChild>
                      <Link to="/owner/add-vehicle">
                        <Plus className="mr-2 h-4 w-4" />
                        Add New Vehicle
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link to="/owner/bookings">
                        <Calendar className="mr-2 h-4 w-4" />
                        View All Bookings
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link to="/owner/analytics">
                        <TrendingUp className="mr-2 h-4 w-4" />
                        View Analytics
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link to="/owner/profile">
                        <Users className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="vehicles" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    My Vehicles
                    <Button asChild>
                      <Link to="/owner/add-vehicle">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Vehicle
                      </Link>
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {myVehicles.map((vehicle) => (
                      <div key={vehicle.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <img
                              src={vehicle.image}
                              alt={vehicle.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div>
                              <h3 className="font-semibold">{vehicle.name}</h3>
                              <Badge className={getStatusColor(vehicle.status)}>
                                {vehicle.status}
                              </Badge>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" asChild>
                            <Link to={`/owner/edit-vehicle/${vehicle.id}`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div>
                            <p className="text-muted-foreground">Bookings</p>
                            <p className="font-medium">{vehicle.bookings}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Earnings</p>
                            <p className="font-medium">{vehicle.earnings}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Rating</p>
                            <p className="font-medium flex items-center">
                              <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                              {vehicle.rating}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bookings">
              <Card>
                <CardHeader>
                  <CardTitle>All Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Vehicle</TableHead>
                        <TableHead>Dates</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentBookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={booking.avatar} alt={booking.customer} />
                                <AvatarFallback>
                                  {booking.customer.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span>{booking.customer}</span>
                            </div>
                          </TableCell>
                          <TableCell>{booking.vehicle}</TableCell>
                          <TableCell>{booking.dates}</TableCell>
                          <TableCell>{booking.amount}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <TrendingUp className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Analytics Coming Soon</h3>
                    <p className="text-muted-foreground">
                      Detailed analytics and insights about your vehicle performance will be available here.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};
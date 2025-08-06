import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Calendar, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Car, 
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const bookings = [
  {
    id: "BK001",
    customer: {
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
      phone: "+1 (555) 123-4567"
    },
    vehicle: {
      name: "Tesla Model 3",
      image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=80&h=80&fit=crop",
      plate: "ABC-123"
    },
    dates: {
      start: "2024-01-15",
      end: "2024-01-18",
      duration: 3
    },
    amount: 267,
    status: "confirmed",
    pickupLocation: "San Francisco Airport",
    createdAt: "2024-01-10T10:30:00Z"
  },
  {
    id: "BK002",
    customer: {
      name: "Jane Smith",
      email: "jane@example.com",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
      phone: "+1 (555) 987-6543"
    },
    vehicle: {
      name: "BMW X5",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=80&h=80&fit=crop",
      plate: "XYZ-789"
    },
    dates: {
      start: "2024-01-20",
      end: "2024-01-22",
      duration: 2
    },
    amount: 360,
    status: "pending",
    pickupLocation: "Downtown LA",
    createdAt: "2024-01-18T14:20:00Z"
  },
  {
    id: "BK003",
    customer: {
      name: "Mike Johnson",
      email: "mike@example.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
      phone: "+1 (555) 456-7890"
    },
    vehicle: {
      name: "Honda Civic",
      image: "https://images.unsplash.com/photo-1619976215607-a4b7c0bb05f4?w=80&h=80&fit=crop",
      plate: "DEF-456"
    },
    dates: {
      start: "2024-01-25",
      end: "2024-01-27",
      duration: 2
    },
    amount: 135,
    status: "completed",
    pickupLocation: "Times Square",
    createdAt: "2024-01-22T09:15:00Z"
  },
  {
    id: "BK004",
    customer: {
      name: "Sarah Wilson",
      email: "sarah@example.com",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
      phone: "+1 (555) 321-0987"
    },
    vehicle: {
      name: "Mercedes C-Class",
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=80&h=80&fit=crop",
      plate: "GHI-789"
    },
    dates: {
      start: "2024-02-01",
      end: "2024-02-05",
      duration: 4
    },
    amount: 480,
    status: "cancelled",
    pickupLocation: "Miami Beach",
    createdAt: "2024-01-25T16:45:00Z"
  }
];

export const Bookings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />;
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "cancelled":
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
  };

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    pending: bookings.filter(b => b.status === 'pending').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    totalRevenue: bookings.filter(b => b.status === 'completed').reduce((sum, b) => sum + b.amount, 0)
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
            <h1 className="text-3xl font-bold">Bookings Management</h1>
            <p className="text-muted-foreground">Track and manage all your vehicle bookings</p>
          </div>
          <Button asChild>
            <Link to="/owner/dashboard">
              Back to Dashboard
            </Link>
          </Button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Bookings</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <Calendar className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Confirmed</p>
                  <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.completed}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold text-green-600">${stats.totalRevenue}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-6"
        >
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <Select value={statusFilter} onValueChange={handleStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-background border shadow-lg z-50">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Bookings Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>All Bookings ({filteredBookings.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booking ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Vehicle</TableHead>
                      <TableHead>Dates</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={booking.customer.avatar} alt={booking.customer.name} />
                              <AvatarFallback>
                                {booking.customer.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{booking.customer.name}</div>
                              <div className="text-sm text-muted-foreground">{booking.customer.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <img
                              src={booking.vehicle.image}
                              alt={booking.vehicle.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div>
                              <div className="font-medium">{booking.vehicle.name}</div>
                              <div className="text-sm text-muted-foreground">{booking.vehicle.plate}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{booking.dates.start} to {booking.dates.end}</div>
                            <div className="text-sm text-muted-foreground">{booking.dates.duration} days</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{booking.pickupLocation}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">${booking.amount}</div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(booking.status)} flex items-center gap-1`}>
                            {getStatusIcon(booking.status)}
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
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
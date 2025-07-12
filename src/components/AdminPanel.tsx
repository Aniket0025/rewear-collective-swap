
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Search, 
  User, 
  Package, 
  ShoppingBag, 
  Check, 
  X, 
  Eye,
  Trash2,
  AlertTriangle,
  Users,
  TrendingUp
} from 'lucide-react';
import { toast } from 'sonner';

interface AdminPanelProps {
  user: any;
  onBack: () => void;
}

export const AdminPanel = ({ user, onBack }: AdminPanelProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for admin panel
  const [users] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      avatar: "/placeholder.svg",
      joinDate: "2024-01-15",
      totalSwaps: 15,
      points: 250,
      status: "Active",
      location: "New York, NY"
    },
    {
      id: 2,
      name: "Mike Chen",
      email: "mike@example.com",
      avatar: "/placeholder.svg",
      joinDate: "2024-02-03",
      totalSwaps: 8,
      points: 120,
      status: "Active",
      location: "Los Angeles, CA"
    },
    {
      id: 3,
      name: "Emma Wilson",
      email: "emma@example.com",
      avatar: "/placeholder.svg",
      joinDate: "2024-01-20",
      totalSwaps: 23,
      points: 380,
      status: "Suspended",
      location: "Chicago, IL"
    }
  ]);

  const [listings] = useState([
    {
      id: 1,
      title: "Vintage Denim Jacket",
      user: "Sarah Johnson",
      category: "Outerwear",
      condition: "Excellent",
      points: 25,
      status: "Pending Review",
      reportCount: 0,
      image: "/placeholder.svg",
      datePosted: "2024-03-10"
    },
    {
      id: 2,
      title: "Designer Handbag",
      user: "Mike Chen",
      category: "Accessories",
      condition: "Like New",
      points: 45,
      status: "Approved",
      reportCount: 0,
      image: "/placeholder.svg",
      datePosted: "2024-03-09"
    },
    {
      id: 3,
      title: "Suspicious Designer Item",
      user: "Emma Wilson",
      category: "Accessories",
      condition: "Like New",
      points: 80,
      status: "Flagged",
      reportCount: 3,
      image: "/placeholder.svg",
      datePosted: "2024-03-08"
    }
  ]);

  const [orders] = useState([
    {
      id: 1,
      swapId: "SW001",
      requester: "Sarah Johnson",
      owner: "Mike Chen",
      item: "Vintage Denim Jacket",
      status: "Completed",
      date: "2024-03-05",
      type: "Direct Swap"
    },
    {
      id: 2,
      swapId: "SW002",
      requester: "Emma Wilson",
      owner: "Sarah Johnson",
      item: "Designer Blouse",
      status: "In Progress",
      date: "2024-03-08",
      type: "Points Redemption"
    }
  ]);

  const handleApprove = (listingId: number) => {
    toast.success("Listing approved successfully");
  };

  const handleReject = (listingId: number) => {
    toast.success("Listing rejected");
  };

  const handleSuspendUser = (userId: number) => {
    toast.success("User suspended");
  };

  const handleDeleteListing = (listingId: number) => {
    toast.success("Listing deleted");
  };

  const stats = {
    totalUsers: 1234,
    activeListings: 456,
    completedSwaps: 789,
    pendingReviews: 23
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack} className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-xl font-bold">Admin Panel</h1>
                <p className="text-sm text-muted-foreground">ReWear Management Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">Admin</Badge>
              <span className="text-sm">{user.name}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Manage Users</TabsTrigger>
            <TabsTrigger value="listings">Manage Listings</TabsTrigger>
            <TabsTrigger value="orders">Manage Orders</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalUsers}</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.activeListings}</div>
                  <p className="text-xs text-muted-foreground">+5% from last week</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completed Swaps</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.completedSwaps}</div>
                  <p className="text-xs text-muted-foreground">+18% from last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.pendingReviews}</div>
                  <p className="text-xs text-muted-foreground">Requires attention</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">New user registered: Sarah M.</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Listing approved: Vintage Jacket</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm">Swap completed: Designer Bag</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-sm">Listing flagged for review</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start">
                    <Eye className="h-4 w-4 mr-2" />
                    Review Flagged Content
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    User Management
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Package className="h-4 w-4 mr-2" />
                    Approve Listings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">User Management</h2>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="grid gap-4">
              {users.map((userData) => (
                <Card key={userData.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                          <User className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{userData.name}</h3>
                          <p className="text-sm text-muted-foreground">{userData.email}</p>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                            <span>Joined: {userData.joinDate}</span>
                            <span>Swaps: {userData.totalSwaps}</span>
                            <span>Points: {userData.points}</span>
                            <span>Location: {userData.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={userData.status === 'Active' ? 'default' : 'destructive'}
                        >
                          {userData.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleSuspendUser(userData.id)}
                        >
                          Suspend
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Listings Tab */}
          <TabsContent value="listings" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Listing Management</h2>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search listings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="grid gap-4">
              {listings.map((listing) => (
                <Card key={listing.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden">
                          <img 
                            src={listing.image} 
                            alt={listing.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold">{listing.title}</h3>
                          <p className="text-sm text-muted-foreground">by {listing.user}</p>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                            <span>Category: {listing.category}</span>
                            <span>Condition: {listing.condition}</span>
                            <span>Points: {listing.points}</span>
                            <span>Posted: {listing.datePosted}</span>
                          </div>
                          {listing.reportCount > 0 && (
                            <div className="flex items-center mt-2">
                              <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />
                              <span className="text-sm text-red-500">
                                {listing.reportCount} reports
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={
                            listing.status === 'Approved' ? 'default' :
                            listing.status === 'Pending Review' ? 'secondary' :
                            'destructive'
                          }
                        >
                          {listing.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        {listing.status === 'Pending Review' && (
                          <>
                            <Button 
                              size="sm"
                              onClick={() => handleApprove(listing.id)}
                            >
                              <Check className="h-4 w-4 mr-2" />
                              Approve
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleReject(listing.id)}
                            >
                              <X className="h-4 w-4 mr-2" />
                              Reject
                            </Button>
                          </>
                        )}
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDeleteListing(listing.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Order Management</h2>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="grid gap-4">
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Swap #{order.swapId}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{order.item}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>Requester: {order.requester}</span>
                          <span>Owner: {order.owner}</span>
                          <span>Date: {order.date}</span>
                          <span>Type: {order.type}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={order.status === 'Completed' ? 'default' : 'secondary'}
                        >
                          {order.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

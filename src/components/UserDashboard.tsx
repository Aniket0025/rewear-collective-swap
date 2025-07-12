import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, MapPin, Calendar, Package, ArrowRight, Plus, Clock, CheckCircle, XCircle, Heart } from 'lucide-react';
import { Map } from './Map';
import { EcoScore, calculateEcoScore } from './EcoScore';

const UserDashboard = ({ user, onNavigate, onItemClick }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data with EcoScore calculations
  const myItems = [
    {
      id: 4,
      title: "Cozy Winter Sweater",
      description: "Warm wool blend sweater, perfect for cold days",
      category: "Tops",
      size: "L",
      condition: "Good",
      points: 90,
      image: `https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop`,
      status: "active",
      likes: 12,
      views: 45,
      reuseCount: 1,
      trustScore: 4.2
    },
    {
      id: 5,
      title: "Leather Ankle Boots",
      description: "Classic brown leather boots with minimal wear",
      category: "Boots",
      size: "8",
      condition: "Excellent",
      points: 150,
      image: `https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=400&h=400&fit=crop`,
      status: "pending",
      likes: 8,
      views: 23,
      reuseCount: 2,
      trustScore: 4.8
    }
  ];

  // Mock location data for map
  const nearbyListings = [
    {
      id: 1,
      title: "Vintage Band T-Shirt",
      uploader: "Alex K.",
      location: { lat: 40.7580, lng: -73.9855, address: "Times Square, NY" },
      points: 75,
      condition: "Good",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop"
    },
    {
      id: 2,
      title: "Designer Handbag",
      uploader: "Maria S.",
      location: { lat: 40.7505, lng: -73.9934, address: "Chelsea, NY" },
      points: 200,
      condition: "Excellent",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop"
    }
  ];

  // Calculate average EcoScore for user
  const averageEcoScore = myItems.reduce((sum, item) => {
    return sum + calculateEcoScore({
      condition: item.condition,
      reuseCount: item.reuseCount,
      category: item.category,
      trustScore: item.trustScore
    });
  }, 0) / myItems.length;

  const swapRequests = [
    {
      id: 1,
      type: "incoming",
      item: "Vintage Denim Jacket",
      requester: "Sarah M.",
      requestedItem: "Cozy Winter Sweater",
      status: "pending",
      date: "2024-01-15",
      message: "Love your sweater! Would you be interested in swapping for this vintage denim jacket?"
    },
    {
      id: 2,
      type: "outgoing",
      item: "Floral Summer Dress",
      owner: "Emma L.",
      offeredItem: "Leather Ankle Boots",
      status: "accepted",
      date: "2024-01-14",
      message: "Great condition boots! Happy to swap."
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'accepted': return <CheckCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-green-100">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => onNavigate('home')}
            className="text-green-600 hover:text-green-700"
          >
            ← Back to Home
          </Button>
          <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
          <Button 
            onClick={() => onNavigate('add-item')}
            className="bg-gradient-to-r from-green-500 to-orange-400 hover:from-green-600 hover:to-orange-500 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader className="text-center">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop`} />
                  <AvatarFallback className="text-xl bg-gradient-to-r from-green-500 to-orange-400 text-white">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{user.name}</CardTitle>
                <CardDescription className="flex items-center justify-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{user.location}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{user.points}</div>
                  <div className="text-sm text-gray-500">ReWear Points</div>
                </div>
                
                <div className="text-center">
                  <EcoScore score={Math.round(averageEcoScore)} size="lg" showLabel />
                  <div className="text-xs text-gray-500 mt-1">Average EcoScore</div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Member Since</span>
                    <span className="text-sm font-medium">{user.memberSince}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Swaps</span>
                    <span className="text-sm font-medium">{user.totalSwaps}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Items Listed</span>
                    <span className="text-sm font-medium">{user.itemsListed}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Rating</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{user.rating}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="items">My Items</TabsTrigger>
                <TabsTrigger value="swaps">Swaps</TabsTrigger>
                <TabsTrigger value="map">Map</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Active Listings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-green-600">
                        {myItems.filter(item => item.status === 'active').length}
                      </div>
                      <p className="text-sm text-gray-500">Items available for swap</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Pending Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-orange-500">
                        {swapRequests.filter(req => req.status === 'pending').length}
                      </div>
                      <p className="text-sm text-gray-500">Awaiting response</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">This Month</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-purple-600">3</div>
                      <p className="text-sm text-gray-500">Successful swaps</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your latest swaps and interactions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium">Swap completed with Emma L.</p>
                        <p className="text-sm text-gray-500">Floral Summer Dress ↔ Leather Ankle Boots</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-3 bg-orange-50 rounded-lg">
                      <Clock className="w-5 h-5 text-orange-600" />
                      <div>
                        <p className="font-medium">New swap request from Sarah M.</p>
                        <p className="text-sm text-gray-500">Interested in your Cozy Winter Sweater</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
                      <Heart className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Your item got 5 new likes</p>
                        <p className="text-sm text-gray-500">Leather Ankle Boots is trending!</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="items" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {myItems.map((item) => {
                    const ecoScore = calculateEcoScore({
                      condition: item.condition,
                      reuseCount: item.reuseCount,
                      category: item.category,
                      trustScore: item.trustScore
                    });

                    return (
                      <Card key={item.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <div className="relative overflow-hidden rounded-t-lg">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            onClick={() => onItemClick(item)}
                          />
                          <Badge className={`absolute top-3 right-3 ${getStatusColor(item.status)}`}>
                            {getStatusIcon(item.status)}
                            {item.status}
                          </Badge>
                        </div>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{item.title}</CardTitle>
                            <div className="flex items-center space-x-1 text-orange-500">
                              <Star className="w-4 h-4 fill-current" />
                              <span className="text-sm font-medium">{item.points}</span>
                            </div>
                          </div>
                          <CardDescription>{item.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                            <span>Size {item.size} • {item.condition}</span>
                            <div className="flex items-center space-x-3">
                              <span>{item.views} views</span>
                              <span>❤️ {item.likes}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mb-3">
                            <EcoScore score={ecoScore} />
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" className="flex-1">
                              Edit
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex-1"
                              onClick={() => onItemClick(item)}
                            >
                              View
                              <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="swaps" className="space-y-6">
                <div className="space-y-6">
                  {swapRequests.map((request) => (
                    <Card key={request.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Badge variant={request.type === 'incoming' ? 'default' : 'secondary'}>
                              {request.type === 'incoming' ? 'Incoming' : 'Outgoing'}
                            </Badge>
                            <Badge className={getStatusColor(request.status)}>
                              {getStatusIcon(request.status)}
                              {request.status}
                            </Badge>
                          </div>
                          <span className="text-sm text-gray-500">{request.date}</span>
                        </div>
                        <CardTitle className="text-lg">
                          {request.type === 'incoming' 
                            ? `${request.requester} wants to swap` 
                            : `Swap request to ${request.owner}`
                          }
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="text-center">
                            <div className="font-medium">{request.type === 'incoming' ? request.requestedItem : request.offeredItem}</div>
                            <div className="text-sm text-gray-500">Your item</div>
                          </div>
                          <ArrowRight className="w-5 h-5 text-gray-400" />
                          <div className="text-center">
                            <div className="font-medium">{request.type === 'incoming' ? request.item : request.item}</div>
                            <div className="text-sm text-gray-500">Their item</div>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-4">"{request.message}"</p>
                        {request.status === 'pending' && (
                          <div className="flex space-x-2">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              Accept
                            </Button>
                            <Button size="sm" variant="outline">
                              Decline
                            </Button>
                            <Button size="sm" variant="ghost">
                              Message
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="map" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Nearby Listings</CardTitle>
                    <CardDescription>
                      Discover clothing items from other users in your area
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Map 
                      listings={nearbyListings}
                      onViewListing={(id) => {
                        const listing = nearbyListings.find(l => l.id === id);
                        if (listing) {
                          console.log('View listing:', listing);
                          // Handle navigation to listing
                        }
                      }}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

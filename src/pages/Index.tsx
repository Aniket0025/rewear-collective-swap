
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Star, Users, Leaf, ArrowRight, ShoppingBag, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AuthForm from '@/components/AuthForm';
import UserDashboard from '@/components/UserDashboard';
import ItemDetail from '@/components/ItemDetail';
import AddItem from '@/components/AddItem';

const Index = () => {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('home');
  const [selectedItem, setSelectedItem] = useState(null);

  // Mock featured items
  const featuredItems = [
    {
      id: 1,
      title: "Vintage Denim Jacket",
      description: "Classic 90s style denim jacket in excellent condition",
      category: "Outerwear",
      size: "M",
      condition: "Excellent",
      points: 120,
      image: `https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop`,
      uploader: "Sarah M.",
      location: "Brooklyn, NY",
      tags: ["vintage", "denim", "90s"],
      likes: 24
    },
    {
      id: 2,
      title: "Floral Summer Dress",
      description: "Beautiful floral midi dress perfect for summer",
      category: "Dresses",
      size: "S",
      condition: "Like New",
      points: 85,
      image: `https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop`,
      uploader: "Emma L.",
      location: "Portland, OR",
      tags: ["floral", "summer", "midi"],
      likes: 18
    },
    {
      id: 3,
      title: "Designer Sneakers",
      description: "Barely worn designer sneakers, original box included",
      category: "Shoes",
      size: "9",
      condition: "Excellent",
      points: 200,
      image: `https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop`,
      uploader: "Mike R.",
      location: "Austin, TX",
      tags: ["designer", "sneakers", "barely-worn"],
      likes: 31
    }
  ];

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setCurrentView('item-detail');
  };

  if (currentView === 'dashboard' && user) {
    return <UserDashboard user={user} onNavigate={setCurrentView} onItemClick={handleItemClick} />;
  }

  if (currentView === 'item-detail' && selectedItem) {
    return <ItemDetail item={selectedItem} user={user} onBack={() => setCurrentView(user ? 'dashboard' : 'home')} />;
  }

  if (currentView === 'add-item' && user) {
    return <AddItem user={user} onBack={() => setCurrentView('dashboard')} onSuccess={() => setCurrentView('dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-green-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-orange-400 rounded-full flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-orange-500 bg-clip-text text-transparent">
              ReWear
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-700">{user.points} points</span>
                </div>
                <Button 
                  onClick={() => setCurrentView('dashboard')}
                  variant="outline"
                  className="border-green-200 hover:bg-green-50"
                >
                  Dashboard
                </Button>
                <Button 
                  onClick={() => setUser(null)}
                  variant="ghost"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-green-500 to-orange-400 hover:from-green-600 hover:to-orange-500 text-white">
                    Join ReWear
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-center text-xl font-bold">Welcome to ReWear</DialogTitle>
                  </DialogHeader>
                  <AuthForm onSuccess={setUser} />
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 via-orange-500 to-green-600 bg-clip-text text-transparent">
            Give Your Clothes a Second Life
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Join our sustainable community where fashion meets friendship. Swap, share, and discover amazing pre-loved clothing while earning points and making a positive impact.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-green-500 to-orange-400 hover:from-green-600 hover:to-orange-500 text-white px-8 py-3 text-lg"
              onClick={() => user ? setCurrentView('dashboard') : null}
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Start Swapping
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-green-200 hover:bg-green-50 px-8 py-3 text-lg"
            >
              Browse Items
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            {user && (
              <Button 
                size="lg" 
                variant="outline"
                className="border-orange-200 hover:bg-orange-50 px-8 py-3 text-lg"
                onClick={() => setCurrentView('add-item')}
              >
                <Plus className="w-5 h-5 mr-2" />
                List an Item
              </Button>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800">2,847</h3>
              <p className="text-gray-600">Active Members</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800">15,293</h3>
              <p className="text-gray-600">Items Swapped</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800">8,642</h3>
              <p className="text-gray-600">Lbs CO2 Saved</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Featured Items</h3>
            <p className="text-gray-600">Discover amazing pre-loved fashion from our community</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredItems.map((item) => (
              <Card 
                key={item.id} 
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-white/80 backdrop-blur-sm"
                onClick={() => handleItemClick(item)}
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2">
                    <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
                  </div>
                  <Badge className="absolute top-3 left-3 bg-green-500 hover:bg-green-600">
                    {item.condition}
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                      {item.title}
                    </CardTitle>
                    <div className="flex items-center space-x-1 text-orange-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium">{item.points}</span>
                    </div>
                  </div>
                  <CardDescription className="text-gray-600">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Size {item.size}</span>
                      <span>•</span>
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-400">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{item.likes}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {item.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">How ReWear Works</h3>
            <p className="text-gray-600">Simple steps to start your sustainable fashion journey</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3">List Your Items</h4>
              <p className="text-gray-600">Upload photos and details of clothes you no longer wear. Earn points for each approved listing.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Browse & Swap</h4>
              <p className="text-gray-600">Discover amazing items from the community. Use points or propose direct swaps with other members.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Make a Difference</h4>
              <p className="text-gray-600">Reduce waste, save money, and build connections while giving clothes a second life.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-orange-400 rounded-full flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold">ReWear</h1>
          </div>
          <p className="text-gray-400 mb-6">Building a sustainable future, one swap at a time.</p>
          <div className="text-sm text-gray-500">
            © 2024 ReWear Community Exchange. Made with ❤️ for the planet.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

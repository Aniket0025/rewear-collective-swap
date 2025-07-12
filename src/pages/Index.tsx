import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Heart, 
  Star, 
  MapPin, 
  User, 
  ShoppingBag, 
  Plus,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import AuthForm from '@/components/AuthForm';
import UserDashboard from '@/components/UserDashboard';
import ItemDetail from '@/components/ItemDetail';
import AddItem from '@/components/AddItem';
import { ItemListing } from '@/components/ItemListing';
import { AdminPanel } from '@/components/AdminPanel';

const Index = () => {
  const [currentView, setCurrentView] = useState('landing');
  const [user, setUser] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Mock data for featured items
  const [featuredItems] = useState([
    {
      id: 1,
      title: "Vintage Denim Jacket",
      description: "Classic 90s denim jacket in excellent condition",
      image: "https://images.unsplash.com/photo-1544966503-7cc6da4e6f84?w=600&h=600&fit=crop",
      points: 25,
      condition: "Excellent",
      size: "M",
      category: "Outerwear",
      uploader: "Sarah M.",
      location: "Brooklyn, NY",
      user: { name: "Sarah M.", avatar: "/placeholder.svg", location: "Brooklyn, NY" },
      tags: ["vintage", "denim", "casual"],
      available: true,
      likes: 12
    },
    {
      id: 2,
      title: "Designer Silk Blouse",
      description: "Elegant silk blouse perfect for office wear",
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=600&fit=crop",
      points: 35,
      condition: "Like New",
      size: "S",
      category: "Tops",
      uploader: "Emma L.",
      location: "Manhattan, NY",
      user: { name: "Emma L.", avatar: "/placeholder.svg", location: "Manhattan, NY" },
      tags: ["silk", "professional", "designer"],
      available: true,
      likes: 8
    },
    {
      id: 3,
      title: "Cozy Knit Sweater",
      description: "Warm and comfortable for winter days",
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=600&fit=crop",
      points: 20,
      condition: "Good",
      size: "L",
      category: "Tops",
      uploader: "Mike R.",
      location: "Queens, NY",
      user: { name: "Mike R.", avatar: "/placeholder.svg", location: "Queens, NY" },
      tags: ["knit", "warm", "casual"],
      available: true,
      likes: 15
    }
  ]);

  const [allItems, setAllItems] = useState(featuredItems);
  const [currentSlide, setCurrentSlide] = useState(0);

  const categories = [
    { name: 'All', icon: '👕', count: 120 },
    { name: 'Tops', icon: '👔', count: 45 },
    { name: 'Bottoms', icon: '👖', count: 32 },
    { name: 'Dresses', icon: '👗', count: 28 },
    { name: 'Outerwear', icon: '🧥', count: 15 },
    { name: 'Shoes', icon: '👠', count: 25 },
    { name: 'Accessories', icon: '👜', count: 18 }
  ];

  // Mock user for testing
  useEffect(() => {
    // Simulate logged in user
    setUser({
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      avatar: "/placeholder.svg",
      points: 150,
      location: "New York, NY",
      isAdmin: false
    });
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredItems.length) % featuredItems.length);
  };

  const filteredItems = allItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentView('landing');
  };

  if (currentView === 'auth') {
    return <AuthForm onSuccess={handleLogin} />;
  }

  if (currentView === 'dashboard' && user) {
    return <UserDashboard 
      user={user} 
      onNavigate={(view) => setCurrentView(view)}
      onItemClick={(item) => {
        setSelectedItem(item);
        setCurrentView('itemDetail');
      }}
    />;
  }

  if (currentView === 'addItem' && user) {
    return <AddItem 
      user={user} 
      onBack={() => setCurrentView('landing')} 
      onSuccess={() => setCurrentView('landing')} 
    />;
  }

  if (currentView === 'itemDetail' && selectedItem) {
    return <ItemDetail 
      item={selectedItem} 
      user={user}
      onBack={() => setCurrentView('landing')} 
    />;
  }

  if (currentView === 'itemListing' && selectedItem) {
    return <ItemListing 
      item={selectedItem}
      relatedItems={allItems.filter(item => item.id !== selectedItem.id).slice(0, 6)}
      onBack={() => setCurrentView('landing')}
      onItemClick={(item) => {
        setSelectedItem(item);
        setCurrentView('itemDetail');
      }}
    />;
  }

  if (currentView === 'admin' && user?.isAdmin) {
    return <AdminPanel user={user} onBack={() => setCurrentView('landing')} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-primary">ReWear</div>
              <Badge variant="secondary" className="text-xs">Community Exchange</Badge>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <button className="text-foreground hover:text-primary transition-colors">Home</button>
              <button 
                onClick={() => setCurrentView('browse')}
                className="text-foreground hover:text-primary transition-colors"
              >
                Browse
              </button>
              <button className="text-foreground hover:text-primary transition-colors">How It Works</button>
              <button className="text-foreground hover:text-primary transition-colors">Community</button>
            </nav>

            <div className="flex items-center space-x-3">
              {user ? (
                <>
                  <div className="hidden sm:flex items-center space-x-2 text-sm">
                    <span className="text-muted-foreground">Points:</span>
                    <span className="font-semibold text-primary">{user.points}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentView('addItem')}
                    className="hidden sm:flex"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    List Item
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentView('dashboard')}
                    className="flex items-center space-x-2"
                  >
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <User className="h-3 w-3 text-primary-foreground" />
                    </div>
                    <span className="hidden sm:inline">{user.name}</span>
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" onClick={() => setCurrentView('auth')}>
                    Login
                  </Button>
                  <Button onClick={() => setCurrentView('auth')}>
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-secondary/10 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Swap. Share. <span className="text-primary">Sustain.</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our community-driven platform where fashion meets sustainability. 
            Exchange clothes, earn points, and give your wardrobe a second life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" onClick={() => setCurrentView('auth')} className="min-w-[150px]">
              Start Swapping
            </Button>
            <Button size="lg" variant="outline" className="min-w-[150px]">
              Browse Items
            </Button>
            <Button 
              size="lg" 
              variant="secondary" 
              onClick={() => setCurrentView('addItem')}
              className="min-w-[150px]"
            >
              List an Item
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-md mx-auto">
            <div>
              <div className="text-2xl font-bold text-primary">1,234</div>
              <div className="text-sm text-muted-foreground">Items Swapped</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">567</div>
              <div className="text-sm text-muted-foreground">Active Members</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">89%</div>
              <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items Carousel */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Featured Items</h2>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={prevSlide}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={nextSlide}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {featuredItems.map((item) => (
                <div key={item.id} className="w-full flex-shrink-0 px-2">
                  <Card 
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => {
                      setSelectedItem(item);
                      setCurrentView('itemListing');
                    }}
                  >
                    <CardContent className="p-0">
                      <div className="grid md:grid-cols-2 gap-6 p-6">
                        <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex flex-col justify-center space-y-4">
                          <div>
                            <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                            <p className="text-muted-foreground mb-4">{item.description}</p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <Badge variant="secondary">{item.condition}</Badge>
                            <Badge variant="outline">Size {item.size}</Badge>
                            <div className="flex items-center text-primary font-bold">
                              <Star className="h-4 w-4 mr-1" />
                              {item.points} points
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <User className="h-4 w-4" />
                            <span>{item.user.name}</span>
                            <MapPin className="h-4 w-4 ml-2" />
                            <span>{item.user.location}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {categories.map((category) => (
              <Card 
                key={category.name}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedCategory === category.name ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedCategory(category.name)}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <h3 className="font-semibold mb-1">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.count} items</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search for items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              {filteredItems.length} items found
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            </div>
          </div>
        </div>
      </section>

      {/* Items Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <Card 
                key={item.id}
                className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1"
                onClick={() => {
                  setSelectedItem(item);
                  setCurrentView('itemDetail');
                }}
              >
                <CardContent className="p-0">
                  <div className="aspect-square bg-muted relative overflow-hidden rounded-t-lg">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <button className="absolute top-3 right-3 p-2 bg-background/80 rounded-full hover:bg-background transition-colors">
                      <Heart className="h-4 w-4" />
                    </button>
                    {item.available && (
                      <Badge className="absolute top-3 left-3 bg-green-500 hover:bg-green-600">
                        Available
                      </Badge>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1 truncate">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="text-xs">{item.condition}</Badge>
                        <span className="text-xs text-muted-foreground">Size {item.size}</span>
                      </div>
                      <div className="flex items-center text-primary font-bold">
                        <Star className="h-3 w-3 mr-1" />
                        <span className="text-sm">{item.points}</span>
                      </div>
                    </div>
                    <div className="flex items-center mt-3 text-xs text-muted-foreground">
                      <User className="h-3 w-3 mr-1" />
                      <span>{item.user.name}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">ReWear</h3>
              <p className="text-sm text-muted-foreground">
                Sustainable fashion through community-driven clothing exchange.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">How It Works</a></li>
                <li><a href="#" className="hover:text-foreground">Browse Items</a></li>
                <li><a href="#" className="hover:text-foreground">List an Item</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Guidelines</a></li>
                <li><a href="#" className="hover:text-foreground">Support</a></li>
                <li><a href="#" className="hover:text-foreground">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>help@rewear.com</li>
                <li>1-800-REWEAR</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 ReWear. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

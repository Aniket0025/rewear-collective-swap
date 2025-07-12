
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Search, 
  Heart, 
  Star, 
  MapPin, 
  User, 
  Share2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Map } from './Map';
import { EcoScore, calculateEcoScore } from './EcoScore';

interface ItemListingProps {
  item: any;
  relatedItems: any[];
  onBack: () => void;
  onItemClick: (item: any) => void;
}

export const ItemListing = ({ item, relatedItems, onBack, onItemClick }: ItemListingProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  // Mock multiple images for the item
  const itemImages = [item.image, item.image, item.image];

  // Mock location data for map
  const nearbyListings = [
    {
      id: 1,
      title: "Vintage Denim Jacket",
      uploader: "Sarah M.",
      location: { lat: 40.7128, lng: -74.0060, address: "New York, NY" },
      points: 120,
      condition: "Good",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop"
    },
    {
      id: 2,
      title: "Floral Summer Dress",
      uploader: "Emma L.",
      location: { lat: 40.7589, lng: -73.9851, address: "Manhattan, NY" },
      points: 95,
      condition: "Excellent",
      image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop"
    }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % itemImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + itemImages.length) % itemImages.length);
  };

  // Calculate EcoScore for the item
  const ecoScore = calculateEcoScore({
    condition: item.condition,
    reuseCount: item.reuseCount || 1,
    category: item.category,
    trustScore: item.trustScore || 4.5
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack} className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md mx-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search for items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
              <img 
                src={itemImages[currentImageIndex]} 
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                  isLiked ? 'bg-red-500 text-white' : 'bg-background/80 hover:bg-background'
                }`}
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              
              {itemImages.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-background/80 rounded-full hover:bg-background transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-background/80 rounded-full hover:bg-background transition-colors"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </>
              )}
            </div>
            
            {/* Thumbnail Images */}
            {itemImages.length > 1 && (
              <div className="flex space-x-2">
                {itemImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      currentImageIndex === index ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`${item.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{item.title}</h1>
              <p className="text-lg text-muted-foreground mb-4">{item.description}</p>
              
              <div className="flex items-center space-x-4 mb-6">
                <Badge variant="secondary" className="text-sm">{item.condition}</Badge>
                <Badge variant="outline" className="text-sm">Size {item.size}</Badge>
                <Badge variant="outline" className="text-sm">{item.category}</Badge>
                <div className="flex items-center text-primary font-bold">
                  <Star className="h-4 w-4 mr-1" />
                  <span>{item.points} points</span>
                </div>
                <EcoScore score={ecoScore} showLabel />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {item.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* User Info */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">{item.user.name}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3 mr-1" />
                    {item.user.location}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-muted-foreground">Member since:</span>
                <span>January 2024</span>
                <Badge variant="secondary" className="ml-2">Verified</Badge>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {item.available ? (
                <>
                  <Button size="lg" className="w-full">
                    Request Swap
                  </Button>
                  <Button size="lg" variant="outline" className="w-full">
                    Redeem with Points ({item.points} pts)
                  </Button>
                </>
              ) : (
                <Button size="lg" disabled className="w-full">
                  Currently Unavailable
                </Button>
              )}
              <Button size="lg" variant="secondary" className="w-full">
                Message Owner
              </Button>
            </div>

            {/* Item Details */}
            <div className="border rounded-lg p-4 space-y-3">
              <h3 className="font-semibold mb-3">Item Details</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Category:</span>
                  <span className="ml-2">{item.category}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Size:</span>
                  <span className="ml-2">{item.size}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Condition:</span>
                  <span className="ml-2">{item.condition}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Posted:</span>
                  <span className="ml-2">2 days ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Nearby Listings</h2>
          <Map 
            listings={nearbyListings}
            onViewListing={(id) => {
              const listing = nearbyListings.find(l => l.id === id);
              if (listing) {
                console.log('View listing:', listing);
                // Handle navigation to listing
              }
            }}
            className="mb-8"
          />
        </section>

        {/* Related Items */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Related Items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {relatedItems.map((relatedItem) => {
              const relatedEcoScore = calculateEcoScore({
                condition: relatedItem.condition,
                reuseCount: relatedItem.reuseCount || 1,
                category: relatedItem.category,
                trustScore: relatedItem.trustScore || 4.5
              });

              return (
                <Card 
                  key={relatedItem.id}
                  className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1"
                  onClick={() => onItemClick(relatedItem)}
                >
                  <CardContent className="p-0">
                    <div className="aspect-square bg-muted relative overflow-hidden rounded-t-lg">
                      <img 
                        src={relatedItem.image} 
                        alt={relatedItem.title}
                        className="w-full h-full object-cover"
                      />
                      {relatedItem.available && (
                        <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600 text-xs">
                          Available
                        </Badge>
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-sm mb-1 truncate">{relatedItem.title}</h3>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="text-xs">{relatedItem.condition}</Badge>
                        <div className="flex items-center text-primary text-sm">
                          <Star className="h-3 w-3 mr-1" />
                          <span>{relatedItem.points}</span>
                        </div>
                      </div>
                      <EcoScore score={relatedEcoScore} size="sm" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

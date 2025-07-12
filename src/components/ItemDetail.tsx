
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Heart, Star, MapPin, Calendar, ArrowLeft, MessageCircle, Repeat, Eye, Share2 } from 'lucide-react';
import { toast } from 'sonner';

const ItemDetail = ({ item, user, onBack }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [swapMessage, setSwapMessage] = useState('');

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast.success(isLiked ? 'Removed from favorites' : 'Added to favorites');
  };

  const handleSwapRequest = () => {
    toast.success('Swap request sent successfully!');
    setSwapMessage('');
  };

  const handlePointsRedeem = () => {
    if (user && user.points >= item.points) {
      toast.success(`Successfully redeemed ${item.title} for ${item.points} points!`);
    } else {
      toast.error('Insufficient points for this item');
    }
  };

  const images = [
    item.image,
    `https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=600&fit=crop`,
    `https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=600&fit=crop`
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-green-100">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={onBack} className="text-green-600 hover:text-green-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Share2 className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLike}
              className={isLiked ? 'text-red-500' : 'text-gray-600'}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg bg-white shadow-lg">
              <img 
                src={images[currentImageIndex]} 
                alt={item.title}
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              <Badge className="absolute top-4 left-4 bg-green-500 hover:bg-green-600">
                {item.condition}
              </Badge>
              <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {images.length}
              </div>
            </div>
            
            {/* Thumbnail Navigation */}
            <div className="flex space-x-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    currentImageIndex === index ? 'border-green-500' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img src={img} alt={`${item.title} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{item.title}</h1>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-orange-500 fill-current" />
                  <span className="text-xl font-bold text-orange-500">{item.points}</span>
                  <span className="text-sm text-gray-500">points</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-gray-600 mb-4">
                <span>Size {item.size}</span>
                <span>•</span>
                <span>{item.category}</span>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>{Math.floor(Math.random() * 100) + 50} views</span>
                </div>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed">{item.description}</p>
            </div>

            {/* Item Tags */}
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-gray-100 text-gray-700">
                  #{tag}
                </Badge>
              ))}
            </div>

            {/* Uploader Info */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={`https://images.unsplash.com/photo-1494790108755-2616b164c990?w=100&h=100&fit=crop`} />
                    <AvatarFallback className="bg-gradient-to-r from-green-500 to-orange-400 text-white">
                      {item.uploader.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{item.uploader}</CardTitle>
                    <CardDescription className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{item.location}</span>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="font-semibold">4.8</div>
                    <div className="text-sm text-gray-500">Rating</div>
                  </div>
                  <div>
                    <div className="font-semibold">23</div>
                    <div className="text-sm text-gray-500">Swaps</div>
                  </div>
                  <div>
                    <div className="font-semibold">2 years</div>
                    <div className="text-sm text-gray-500">Member</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            {user ? (
              <div className="space-y-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-gradient-to-r from-green-500 to-orange-400 hover:from-green-600 hover:to-orange-500 text-white py-3 text-lg">
                      <Repeat className="w-5 h-5 mr-2" />
                      Request Swap
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Send Swap Request</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="text-sm text-gray-600">
                        Send a message to {item.uploader} about swapping for "{item.title}"
                      </div>
                      <Textarea
                        placeholder="Hi! I'm interested in swapping for your item. I have..."
                        value={swapMessage}
                        onChange={(e) => setSwapMessage(e.target.value)}
                        rows={4}
                      />
                      <div className="flex space-x-2">
                        <Button onClick={handleSwapRequest} className="flex-1">
                          Send Request
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Message First
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button 
                  variant="outline" 
                  className="w-full border-orange-200 hover:bg-orange-50 py-3 text-lg"
                  onClick={handlePointsRedeem}
                  disabled={user.points < item.points}
                >
                  <Star className="w-5 h-5 mr-2" />
                  Redeem for {item.points} Points
                  {user.points < item.points && (
                    <span className="ml-2 text-sm text-red-500">
                      (Need {item.points - user.points} more)
                    </span>
                  )}
                </Button>
              </div>
            ) : (
              <Card className="bg-green-50 border-green-200">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-green-800 mb-4">Sign in to request swaps and redeem points!</p>
                    <Button className="bg-gradient-to-r from-green-500 to-orange-400 hover:from-green-600 hover:to-orange-500 text-white">
                      Sign In / Sign Up
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Item Stats */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{item.likes || 0}</div>
                <div className="text-sm text-gray-500">Likes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {Math.floor(Math.random() * 10) + 1}
                </div>
                <div className="text-sm text-gray-500">Days ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;


import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface MapProps {
  listings: Array<{
    id: number;
    title: string;
    uploader: string;
    location: {
      lat: number;
      lng: number;
      address: string;
    };
    points: number;
    condition: string;
    image: string;
  }>;
  onViewListing: (id: number) => void;
  className?: string;
}

export const Map = ({ listings, onViewListing, className = "" }: MapProps) => {
  // Calculate center point and bounds
  const centerLat = listings.length > 0 
    ? listings.reduce((sum, item) => sum + item.location.lat, 0) / listings.length 
    : 51.505;
  const centerLng = listings.length > 0 
    ? listings.reduce((sum, item) => sum + item.location.lng, 0) / listings.length 
    : -0.09;

  return (
    <div className={`h-96 w-full rounded-lg overflow-hidden shadow-lg ${className}`}>
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={13}
        className="h-full w-full"
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {listings.map((listing) => (
          <Marker
            key={listing.id}
            position={[listing.location.lat, listing.location.lng]}
            icon={defaultIcon}
          >
            <Popup className="min-w-64">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <img 
                    src={listing.image} 
                    alt={listing.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{listing.title}</h3>
                    <p className="text-xs text-gray-600">by {listing.uploader}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {listing.condition}
                      </Badge>
                      <div className="flex items-center text-orange-500 text-xs">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        {listing.points}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center text-xs text-gray-500">
                  <MapPin className="w-3 h-3 mr-1" />
                  {listing.location.address}
                </div>
                
                <Button 
                  size="sm" 
                  className="w-full"
                  onClick={() => onViewListing(listing.id)}
                >
                  View Listing
                </Button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

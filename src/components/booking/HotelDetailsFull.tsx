import { MapPin, Star, Clock, Phone, Mail, Building, Car, Baby, Dog, Award, Shield, Wifi, Sparkles, Bed, Users, Home } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HotelImageGallery } from './HotelImageGallery';
import { HotelAmenitiesList } from './HotelAmenitiesList';
import { HotelLocationMap } from './HotelLocationMap';
import { useTheme } from '@/contexts/ThemeContext';
import type { HotelDetailsFull as HotelDetailsFullType } from '@/lib/liteapi';

interface HotelDetailsFullProps {
  hotelDetails: HotelDetailsFullType;
}

export function HotelDetailsFull({ hotelDetails }: HotelDetailsFullProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  // Card style helper
  const cardStyle = isDark
    ? 'bg-dark-card border border-white/10'
    : 'bg-white border border-gray-100';

  const textPrimary = isDark ? 'text-white' : 'text-gray-900';
  const textSecondary = isDark ? 'text-white/70' : 'text-gray-600';
  const textMuted = isDark ? 'text-white/50' : 'text-gray-500';

  return (
    <div className="space-y-6">
      {/* Image Gallery */}
      <div className="relative">
        <HotelImageGallery images={hotelDetails.hotelImages || []} hotelName={hotelDetails.name} />
      </div>

      {/* Hotel Header Card - Premium compact design */}
      <Card className={`p-5 md:p-6 shadow-lg ${cardStyle}`}>
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
          <div className="flex-1">
            {/* Hotel Name & Chain */}
            <div className="mb-4">
              {hotelDetails.chain && (
                <div className="flex items-center gap-2 mb-2">
                  <Building className={`w-4 h-4 ${isDark ? 'text-cyclades-turquoise' : 'text-cyan-600'}`} />
                  <span className={`text-sm font-medium ${textSecondary}`}>{hotelDetails.chain}</span>
                </div>
              )}
              <h1 className={`text-2xl md:text-3xl lg:text-4xl font-bold leading-tight ${textPrimary}`}>
                {hotelDetails.name}
              </h1>
            </div>

            {/* Rating Badges Row */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {/* Star Rating */}
              {hotelDetails.starRating && (
                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${isDark ? 'bg-yellow-500/20 border border-yellow-500/30' : 'bg-yellow-50 border border-yellow-200'}`}>
                  {Array.from({ length: Math.min(hotelDetails.starRating, 5) }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                  ))}
                  <span className={`ml-1 text-sm font-semibold ${isDark ? 'text-yellow-400' : 'text-yellow-700'}`}>
                    {hotelDetails.starRating}-Star
                  </span>
                </div>
              )}
              {/* Guest Rating */}
              {hotelDetails.rating && hotelDetails.rating > 0 && (
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${isDark ? 'bg-cyclades-turquoise/20 border border-cyclades-turquoise/30' : 'bg-cyan-50 border border-cyan-200'}`}>
                  <Award className={`w-4 h-4 ${isDark ? 'text-cyclades-turquoise' : 'text-cyan-600'}`} />
                  <span className={`text-lg font-bold ${isDark ? 'text-cyclades-turquoise' : 'text-cyan-700'}`}>
                    {hotelDetails.rating.toFixed(1)}
                  </span>
                  <span className={`text-sm ${textMuted}`}>/10</span>
                  {hotelDetails.reviewCount && (
                    <span className={`text-xs ${textMuted}`}>
                      ({hotelDetails.reviewCount.toLocaleString()} reviews)
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Location */}
            <div className={`flex items-start gap-3 p-3 rounded-xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
              <MapPin className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isDark ? 'text-cyclades-turquoise' : 'text-cyan-600'}`} />
              <div>
                <div className={`font-medium text-sm ${textPrimary}`}>{hotelDetails.address}</div>
                <div className={`text-xs ${textMuted}`}>
                  {hotelDetails.city}, {hotelDetails.country}
                  {hotelDetails.zip && ` • ${hotelDetails.zip}`}
                </div>
              </div>
            </div>

            {/* Quick Info Badges */}
            <div className="flex flex-wrap gap-2 mt-4">
              {hotelDetails.parking && (
                <Badge variant="outline" className={`text-xs px-2.5 py-1 ${isDark ? 'bg-white/5 border-white/20 text-white/80' : 'bg-white border-gray-200'}`}>
                  <Car className="w-3.5 h-3.5 mr-1.5 text-green-500" /> Parking
                </Badge>
              )}
              {hotelDetails.childAllowed && (
                <Badge variant="outline" className={`text-xs px-2.5 py-1 ${isDark ? 'bg-white/5 border-white/20 text-white/80' : 'bg-white border-gray-200'}`}>
                  <Baby className="w-3.5 h-3.5 mr-1.5 text-blue-500" /> Family-Friendly
                </Badge>
              )}
              {hotelDetails.petsAllowed && (
                <Badge variant="outline" className={`text-xs px-2.5 py-1 ${isDark ? 'bg-white/5 border-white/20 text-white/80' : 'bg-white border-gray-200'}`}>
                  <Dog className="w-3.5 h-3.5 mr-1.5 text-orange-500" /> Pets Welcome
                </Badge>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Check-in/Check-out Times - Compact */}
      {hotelDetails.checkinCheckoutTimes && (
        <Card className={`p-5 shadow-lg ${cardStyle}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg ${isDark ? 'bg-cyclades-turquoise/20' : 'bg-cyan-100'}`}>
              <Clock className={`w-5 h-5 ${isDark ? 'text-cyclades-turquoise' : 'text-cyan-600'}`} />
            </div>
            <h2 className={`text-lg font-bold ${textPrimary}`}>Check-in & Check-out</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-3 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
              <div className={`text-xs font-medium mb-1 ${textMuted}`}>Check-in</div>
              <div className={`text-lg font-bold ${textPrimary}`}>
                {hotelDetails.checkinCheckoutTimes.checkin || 'Flexible'}
              </div>
              {hotelDetails.checkinCheckoutTimes.checkinStart && (
                <div className={`text-xs ${textMuted}`}>From {hotelDetails.checkinCheckoutTimes.checkinStart}</div>
              )}
            </div>
            <div className={`p-3 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
              <div className={`text-xs font-medium mb-1 ${textMuted}`}>Check-out</div>
              <div className={`text-lg font-bold ${textPrimary}`}>
                {hotelDetails.checkinCheckoutTimes.checkout || 'Flexible'}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Description - Clean and readable */}
      {hotelDetails.hotelDescription && (
        <Card className={`p-5 shadow-lg ${cardStyle}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg ${isDark ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20' : 'bg-gradient-to-br from-purple-100 to-pink-100'}`}>
              <Sparkles className={`w-5 h-5 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
            </div>
            <h2 className={`text-lg font-bold ${textPrimary}`}>About This Hotel</h2>
          </div>
          <div
            className={`prose prose-sm max-w-none leading-relaxed ${isDark ? 'prose-invert' : ''}`}
            style={{ fontSize: '0.95rem', lineHeight: '1.7' }}
            dangerouslySetInnerHTML={{ __html: hotelDetails.hotelDescription }}
          />
        </Card>
      )}

      {/* Rooms Info - If available */}
      {hotelDetails.rooms && hotelDetails.rooms.length > 0 && (
        <Card className={`p-5 shadow-lg ${cardStyle}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg ${isDark ? 'bg-cyclades-turquoise/20' : 'bg-cyan-100'}`}>
              <Bed className={`w-5 h-5 ${isDark ? 'text-cyclades-turquoise' : 'text-cyan-600'}`} />
            </div>
            <h2 className={`text-lg font-bold ${textPrimary}`}>Room Types</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {hotelDetails.rooms.slice(0, 4).map((room, index) => (
              <div key={room.id || index} className={`p-3 rounded-xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-gray-50 border border-gray-100'}`}>
                <h3 className={`font-semibold text-sm mb-2 ${textPrimary}`}>{room.roomName}</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className={`text-xs ${isDark ? 'bg-white/5 border-white/20' : ''}`}>
                    <Users className="w-3 h-3 mr-1" /> Max {room.maxOccupancy}
                  </Badge>
                  {room.roomSizeSquare && (
                    <Badge variant="outline" className={`text-xs ${isDark ? 'bg-white/5 border-white/20' : ''}`}>
                      <Home className="w-3 h-3 mr-1" /> {room.roomSizeSquare}m²
                    </Badge>
                  )}
                </div>
                {room.bedTypes && room.bedTypes.length > 0 && (
                  <div className={`mt-2 text-xs ${textMuted}`}>
                    {room.bedTypes.map((bed, i) => `${bed.quantity}x ${bed.bedType}`).join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Important Information */}
      {hotelDetails.hotelImportantInformation && (
        <Card className={`p-5 shadow-lg ${isDark ? 'bg-blue-900/20 border border-blue-500/30' : 'bg-blue-50 border border-blue-200'}`}>
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg flex-shrink-0 ${isDark ? 'bg-blue-500/30' : 'bg-blue-100'}`}>
              <Shield className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <div className="flex-1">
              <h2 className={`text-lg font-bold mb-2 ${isDark ? 'text-blue-300' : 'text-blue-900'}`}>Important Information</h2>
              <div
                className={`prose prose-sm max-w-none ${isDark ? 'text-blue-200' : 'text-blue-800'}`}
                dangerouslySetInnerHTML={{ __html: hotelDetails.hotelImportantInformation }}
              />
            </div>
          </div>
        </Card>
      )}

      {/* Amenities - Compact grid */}
      {(hotelDetails.hotelFacilities?.length > 0 || hotelDetails.facilities?.length > 0) && (
        <Card className={`p-5 shadow-lg ${cardStyle}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg ${isDark ? 'bg-green-500/20' : 'bg-green-100'}`}>
              <Wifi className={`w-5 h-5 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
            </div>
            <h2 className={`text-lg font-bold ${textPrimary}`}>Facilities & Amenities</h2>
          </div>
          <HotelAmenitiesList
            facilities={hotelDetails.facilities?.length > 0
              ? hotelDetails.facilities
              : hotelDetails.hotelFacilities || []}
            title=""
          />
        </Card>
      )}

      {/* Policies - Compact cards */}
      {hotelDetails.policies && hotelDetails.policies.length > 0 && (
        <Card className={`p-5 shadow-lg ${cardStyle}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg ${isDark ? 'bg-indigo-500/20' : 'bg-indigo-100'}`}>
              <Shield className={`w-5 h-5 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
            </div>
            <h2 className={`text-lg font-bold ${textPrimary}`}>Policies</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {hotelDetails.policies.map((policy, index) => (
              <div key={index} className={`p-3 rounded-xl border-l-4 border-cyclades-turquoise ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                <h3 className={`font-semibold text-sm mb-1 ${textPrimary}`}>{policy.name}</h3>
                <p className={`text-xs leading-relaxed ${textSecondary}`}>{policy.description}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Contact Information - Compact */}
      {(hotelDetails.phone || hotelDetails.email) && (
        <Card className={`p-5 shadow-lg ${cardStyle}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg ${isDark ? 'bg-cyclades-turquoise/20' : 'bg-cyan-100'}`}>
              <Phone className={`w-5 h-5 ${isDark ? 'text-cyclades-turquoise' : 'text-cyan-600'}`} />
            </div>
            <h2 className={`text-lg font-bold ${textPrimary}`}>Contact</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {hotelDetails.phone && (
              <a
                href={`tel:${hotelDetails.phone}`}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${isDark ? 'bg-white/5 hover:bg-white/10 border border-white/10' : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'}`}
              >
                <Phone className={`w-4 h-4 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                <span className={`font-medium ${textPrimary}`}>{hotelDetails.phone}</span>
              </a>
            )}
            {hotelDetails.email && (
              <a
                href={`mailto:${hotelDetails.email}`}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${isDark ? 'bg-white/5 hover:bg-white/10 border border-white/10' : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'}`}
              >
                <Mail className={`w-4 h-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                <span className={`font-medium ${textPrimary}`}>{hotelDetails.email}</span>
              </a>
            )}
          </div>
        </Card>
      )}

      {/* Location Map with Coordinates */}
      {hotelDetails.location && (
        <Card className={`p-5 shadow-lg ${cardStyle}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg ${isDark ? 'bg-cyclades-turquoise/20' : 'bg-cyan-100'}`}>
              <MapPin className={`w-5 h-5 ${isDark ? 'text-cyclades-turquoise' : 'text-cyan-600'}`} />
            </div>
            <h2 className={`text-lg font-bold ${textPrimary}`}>Location</h2>
          </div>
          <HotelLocationMap
            latitude={hotelDetails.location.latitude}
            longitude={hotelDetails.location.longitude}
            hotelName={hotelDetails.name}
            address={hotelDetails.address}
            city={hotelDetails.city}
            country={hotelDetails.country}
          />
        </Card>
      )}
    </div>
  );
}

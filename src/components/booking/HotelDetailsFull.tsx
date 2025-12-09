import { MapPin, Star, Clock, Phone, Mail, Building, Car, Baby, Dog, Award, Shield, Wifi, UtensilsCrossed, Waves, Dumbbell, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HotelImageGallery } from './HotelImageGallery';
import { HotelAmenitiesList } from './HotelAmenitiesList';
import type { HotelDetailsFull } from '@/lib/liteapi';

interface HotelDetailsFullProps {
  hotelDetails: HotelDetailsFull;
}

export function HotelDetailsFull({ hotelDetails }: HotelDetailsFullProps) {
  const hasRates = false; // This will be passed from parent if needed

  return (
    <div className="space-y-6">
      {/* Hero Section with Image Gallery */}
      <div className="relative -mx-4 md:-mx-8 lg:-mx-16">
        <HotelImageGallery images={hotelDetails.hotelImages || []} hotelName={hotelDetails.name} />
      </div>

      {/* Hotel Header - Premium Design */}
      <div className="relative -mt-8 md:-mt-12 lg:-mt-16">
        <Card className="p-6 md:p-8 lg:p-10 shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              {/* Hotel Name & Chain */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 leading-tight">
                    {hotelDetails.name}
                  </h1>
                  {hotelDetails.chain && (
                    <div className="flex items-center gap-2 text-gray-600 mb-3">
                      <Building className="w-4 h-4" />
                      <span className="text-sm font-medium">{hotelDetails.chain}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Rating & Reviews - Premium Badge Style */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                {hotelDetails.starRating && (
                  <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-200">
                    {Array.from({ length: hotelDetails.starRating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    ))}
                    <span className="ml-2 text-sm font-semibold text-gray-700">{hotelDetails.starRating} Stars</span>
                  </div>
                )}
                {hotelDetails.rating && (
                  <div className="flex items-center gap-2 bg-gradient-to-r from-sifnos-turquoise/10 to-sifnos-deep-blue/10 px-4 py-2 rounded-full border border-sifnos-turquoise/20">
                    <Award className="w-5 h-5 text-sifnos-turquoise" />
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-sifnos-deep-blue">
                          {hotelDetails.rating.toFixed(1)}
                        </span>
                        <span className="text-sm text-gray-600">/ 10</span>
                      </div>
                      {hotelDetails.reviewCount && (
                        <div className="text-xs text-gray-600">
                          {hotelDetails.reviewCount.toLocaleString()} reviews
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Location - Enhanced */}
              <div className="flex items-start gap-3 mb-6 p-4 bg-gradient-to-r from-gray-50 to-sifnos-beige/10 rounded-xl border border-gray-200">
                <div className="p-2 bg-sifnos-turquoise/10 rounded-lg">
                  <MapPin className="w-5 h-5 text-sifnos-turquoise" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 mb-1">{hotelDetails.address}</div>
                  <div className="text-sm text-gray-600">
                    {hotelDetails.city}, {hotelDetails.country}
                    {hotelDetails.zip && ` ${hotelDetails.zip}`}
                  </div>
                </div>
              </div>

              {/* Quick Info Badges - Premium Style */}
              <div className="flex flex-wrap gap-2 mb-6">
                {hotelDetails.parking && (
                  <Badge variant="outline" className="px-4 py-2 bg-white border-sifnos-turquoise/30 hover:bg-sifnos-turquoise/10 transition-colors">
                    <Car className="w-4 h-4 mr-2 text-sifnos-turquoise" />
                    <span className="font-medium">Parking Available</span>
                  </Badge>
                )}
                {hotelDetails.childAllowed && (
                  <Badge variant="outline" className="px-4 py-2 bg-white border-sifnos-turquoise/30 hover:bg-sifnos-turquoise/10 transition-colors">
                    <Baby className="w-4 h-4 mr-2 text-sifnos-turquoise" />
                    <span className="font-medium">Family Friendly</span>
                  </Badge>
                )}
                {hotelDetails.petsAllowed && (
                  <Badge variant="outline" className="px-4 py-2 bg-white border-sifnos-turquoise/30 hover:bg-sifnos-turquoise/10 transition-colors">
                    <Dog className="w-4 h-4 mr-2 text-sifnos-turquoise" />
                    <span className="font-medium">Pets Welcome</span>
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Check-in/Check-out Times - Premium Card */}
      {hotelDetails.checkinCheckoutTimes && (
        <Card className="p-6 bg-gradient-to-br from-sifnos-deep-blue/5 via-white to-sifnos-turquoise/5 border-sifnos-turquoise/20 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-sifnos-turquoise/10 rounded-lg">
              <Clock className="w-6 h-6 text-sifnos-turquoise" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Check-in & Check-out</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-white/60 rounded-lg border border-gray-200">
              <div className="text-sm font-medium text-gray-600 mb-2">Check-in</div>
              <div className="text-xl font-bold text-gray-900">
                {hotelDetails.checkinCheckoutTimes.checkin}
              </div>
              {hotelDetails.checkinCheckoutTimes.checkinStart && (
                <div className="text-xs text-gray-500 mt-1">
                  From {hotelDetails.checkinCheckoutTimes.checkinStart}
                </div>
              )}
            </div>
            <div className="p-4 bg-white/60 rounded-lg border border-gray-200">
              <div className="text-sm font-medium text-gray-600 mb-2">Check-out</div>
              <div className="text-xl font-bold text-gray-900">
                {hotelDetails.checkinCheckoutTimes.checkout}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Description - Enhanced */}
      {hotelDetails.hotelDescription && (
        <Card className="p-6 md:p-8 shadow-lg border-0">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-sifnos-turquoise to-sifnos-deep-blue rounded-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">About This Hotel</h2>
          </div>
          <div
            className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
            style={{
              fontSize: '1.125rem',
              lineHeight: '1.75rem',
            }}
            dangerouslySetInnerHTML={{ __html: hotelDetails.hotelDescription }}
          />
        </Card>
      )}

      {/* Important Information - Premium Alert Style */}
      {hotelDetails.hotelImportantInformation && (
        <Card className="p-6 md:p-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-blue-200 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-500 rounded-lg flex-shrink-0">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Important Information</h2>
              <div
                className="prose prose-sm max-w-none text-gray-700 whitespace-pre-line leading-relaxed"
                dangerouslySetInnerHTML={{ __html: hotelDetails.hotelImportantInformation }}
              />
            </div>
          </div>
        </Card>
      )}

      {/* Amenities - Premium Grid */}
      {(hotelDetails.hotelFacilities?.length > 0 || hotelDetails.facilities?.length > 0) && (
        <Card className="p-6 md:p-8 shadow-lg border-0">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-sifnos-turquoise to-sifnos-deep-blue rounded-lg">
              <Wifi className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Hotel Facilities & Amenities</h2>
          </div>
          <HotelAmenitiesList
            facilities={hotelDetails.facilities?.length > 0 
              ? hotelDetails.facilities 
              : hotelDetails.hotelFacilities || []}
            title=""
          />
        </Card>
      )}

      {/* Policies - Premium Cards */}
      {hotelDetails.policies && hotelDetails.policies.length > 0 && (
        <Card className="p-6 md:p-8 shadow-lg border-0">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-sifnos-turquoise to-sifnos-deep-blue rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Hotel Policies</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hotelDetails.policies.map((policy, index) => (
              <div key={index} className="p-5 bg-gradient-to-br from-gray-50 to-white rounded-xl border-l-4 border-sifnos-turquoise shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">{policy.name}</h3>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">{policy.description}</p>
                <div className="space-y-2 text-xs text-gray-600">
                  {policy.child_allowed && (
                    <div className="flex items-center gap-2">
                      <Baby className="w-4 h-4 text-sifnos-turquoise" />
                      <span><strong>Children:</strong> {policy.child_allowed}</span>
                    </div>
                  )}
                  {policy.pets_allowed && (
                    <div className="flex items-center gap-2">
                      <Dog className="w-4 h-4 text-sifnos-turquoise" />
                      <span><strong>Pets:</strong> {policy.pets_allowed}</span>
                    </div>
                  )}
                  {policy.parking && (
                    <div className="flex items-center gap-2">
                      <Car className="w-4 h-4 text-sifnos-turquoise" />
                      <span><strong>Parking:</strong> {policy.parking}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Contact Information - Premium Style */}
      {(hotelDetails.phone || hotelDetails.email) && (
        <Card className="p-6 md:p-8 bg-gradient-to-br from-sifnos-deep-blue/5 to-sifnos-turquoise/5 shadow-lg border-0">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-sifnos-turquoise to-sifnos-deep-blue rounded-lg">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hotelDetails.phone && (
              <a
                href={`tel:${hotelDetails.phone}`}
                className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-sifnos-turquoise hover:shadow-md transition-all group"
              >
                <div className="p-3 bg-sifnos-turquoise/10 rounded-lg group-hover:bg-sifnos-turquoise/20 transition-colors">
                  <Phone className="w-6 h-6 text-sifnos-turquoise" />
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Phone</div>
                  <div className="font-semibold text-gray-900 group-hover:text-sifnos-deep-blue transition-colors">
                    {hotelDetails.phone}
                  </div>
                </div>
              </a>
            )}
            {hotelDetails.email && (
              <a
                href={`mailto:${hotelDetails.email}`}
                className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-sifnos-turquoise hover:shadow-md transition-all group"
              >
                <div className="p-3 bg-sifnos-turquoise/10 rounded-lg group-hover:bg-sifnos-turquoise/20 transition-colors">
                  <Mail className="w-6 h-6 text-sifnos-turquoise" />
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Email</div>
                  <div className="font-semibold text-gray-900 group-hover:text-sifnos-deep-blue transition-colors">
                    {hotelDetails.email}
                  </div>
                </div>
              </a>
            )}
          </div>
        </Card>
      )}

      {/* Location Map - Premium */}
      {hotelDetails.location && (
        <Card className="p-6 md:p-8 shadow-lg border-0 overflow-hidden">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-sifnos-turquoise to-sifnos-deep-blue rounded-lg">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Location</h2>
          </div>
          <div className="h-96 bg-gray-100 rounded-xl overflow-hidden shadow-inner border border-gray-200">
            {import.meta.env.VITE_GOOGLE_MAPS_API_KEY ? (
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&q=${hotelDetails.location.latitude},${hotelDetails.location.longitude}`}
                title={`${hotelDetails.name} Location`}
              />
            ) : (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${hotelDetails.address}, ${hotelDetails.city}, ${hotelDetails.country}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 transition-all group"
              >
                <div className="text-center">
                  <div className="p-4 bg-white rounded-full shadow-lg mb-4 mx-auto w-fit group-hover:scale-110 transition-transform">
                    <MapPin className="w-12 h-12 text-sifnos-turquoise" />
                  </div>
                  <p className="text-gray-900 font-bold text-lg mb-1">View on Google Maps</p>
                  <p className="text-sm text-gray-600">Click to open location</p>
                </div>
              </a>
            )}
          </div>
          <div className="mt-4 flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
            <MapPin className="w-5 h-5 text-sifnos-turquoise flex-shrink-0" />
            <div className="text-sm text-gray-700">
              <span className="font-medium">{hotelDetails.address}</span>
              {', '}
              <span>{hotelDetails.city}, {hotelDetails.country}</span>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

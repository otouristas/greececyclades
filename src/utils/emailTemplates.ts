import { format } from 'date-fns';
import { HotelRoom } from '../types/hotel';

export function generateHotelRequestEmail(params: {
  hotelName: string;
  hotelLogo?: string;
  location: { area: string; island: string };
  selectedDates: [Date | null, Date | null];
  selectedRoom: HotelRoom | null;
  guests: number;
  rooms: number;
  totalPrice: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message?: string;
}) {
  const {
    hotelName,
    hotelLogo,
    location,
    selectedDates,
    selectedRoom,
    guests,
    rooms,
    totalPrice,
    firstName,
    lastName,
    email,
    phone,
    message,
  } = params;

  const checkIn = selectedDates[0] ? format(selectedDates[0], 'MMM dd, yyyy') : 'Not selected';
  const checkOut = selectedDates[1] ? format(selectedDates[1], 'MMM dd, yyyy') : 'Not selected';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Hotel Request - ${hotelName}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #ffffff;
        }
        .header {
          text-align: center;
          padding: 20px 0;
          background: linear-gradient(135deg, #1a365d 0%, #2563eb 100%);
          color: white;
          border-radius: 8px 8px 0 0;
        }
        .logo {
          max-width: 150px;
          margin: 0 auto;
          display: block;
        }
        .content {
          padding: 30px;
        }
        .hotel-info {
          margin: 20px 0;
          padding: 20px;
          background-color: #f8fafc;
          border-radius: 8px;
        }
        .details {
          margin: 20px 0;
          border-top: 1px solid #e2e8f0;
          padding-top: 20px;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          margin: 10px 0;
          padding: 5px 0;
        }
        .footer {
          text-align: center;
          padding: 20px;
          color: #64748b;
          font-size: 14px;
          border-top: 1px solid #e2e8f0;
        }
        .highlight {
          color: #2563eb;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          ${hotelLogo ? `<img src="${hotelLogo}" alt="${hotelName} Logo" class="logo">` : ''}
          <h1>Discover Cyclades</h1>
          <p>Your Gateway to Greek Island Luxury</p>
        </div>
        
        <div class="content">
          <h2>New Hotel Request</h2>
          
          <div class="hotel-info">
            <h3>${hotelName}</h3>
            <p>${location.area}, ${location.island}</p>
            ${selectedRoom ? `<p class="highlight">Selected Room: ${selectedRoom.name}</p>` : ''}
          </div>
          
          <div class="details">
            <h4 style="color: #1a365d; margin-bottom: 15px;">Contact Information</h4>
            <div class="detail-row">
              <span>Name:</span>
              <strong>${firstName} ${lastName}</strong>
            </div>
            <div class="detail-row">
              <span>Email:</span>
              <strong>${email}</strong>
            </div>
            <div class="detail-row">
              <span>Phone:</span>
              <strong>${phone}</strong>
            </div>

            <h4 style="color: #1a365d; margin: 20px 0 15px;">Booking Details</h4>
            <div class="detail-row">
              <span>Check-in:</span>
              <strong>${checkIn}</strong>
            </div>
            <div class="detail-row">
              <span>Check-out:</span>
              <strong>${checkOut}</strong>
            </div>
            <div class="detail-row">
              <span>Guests:</span>
              <strong>${guests}</strong>
            </div>
            <div class="detail-row">
              <span>Rooms:</span>
              <strong>${rooms}</strong>
            </div>
            ${totalPrice > 0 ? `
            <div class="detail-row">
              <span>Estimated Total:</span>
              <strong>€${totalPrice}</strong>
            </div>
            ` : ''}
          </div>
          
          ${message ? `
          <div class="details">
            <h4 style="color: #1a365d; margin-bottom: 15px;">Additional Message</h4>
            <p style="background-color: #f8fafc; padding: 15px; border-radius: 8px;">${message}</p>
          </div>
          ` : ''}
          
          <p>Our team will contact you shortly to confirm availability and process your booking request.</p>
        </div>
        
        <div class="footer">
          <p>Greece Cyclades - Your Perfect Island Experience</p>
          <p>Questions? Email us at discovercycladesgr@gmail.com</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

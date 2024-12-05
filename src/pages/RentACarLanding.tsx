import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { useVehicleStore } from '../store/vehicleStore';
import VehicleLanding from '../components/vehicles/VehicleLanding';

export default function RentACarLanding() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedVehicle, fetchVehicleById } = useVehicleStore();

  useEffect(() => {
    const loadVehicle = async () => {
      if (id) {
        const vehicle = await fetchVehicleById(parseInt(id));
        if (!vehicle) {
          navigate('/rent-a-car');
        }
      }
    };
    loadVehicle();
  }, [id, fetchVehicleById, navigate]);

  if (!selectedVehicle) return null;

  return (
    <>
      <SEO
        title={`Rent ${selectedVehicle.make} ${selectedVehicle.model} in ${selectedVehicle.location}`}
        description={`Rent a ${selectedVehicle.make} ${selectedVehicle.model} in ${selectedVehicle.location}. ${selectedVehicle.category} vehicle with ${selectedVehicle.seats} seats, ${selectedVehicle.transmission} transmission.`}
        image={selectedVehicle.image}
        type="product"
      />
      <VehicleLanding vehicle={selectedVehicle} />
    </>
  );
}
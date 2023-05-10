import { VehicleBookingController } from '../controllers/booking.controller.js';

export const bookingRoutes = (app) => {
  app
    .route('/booking/details/user')
    .post(VehicleBookingController.receiveUserInfo);

  app
    .route('/booking/details/time')
    .post(VehicleBookingController.receiveBookingDates);

  app
    .route('/booking')
    .post(VehicleBookingController.createVehicleBooking);
};

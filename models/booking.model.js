import { Database } from '../config/db.config.js';

export class VehicleBookingModel {
  /**
   * @description
   * this method creates a new vehicle booking
   * @param {object} bookingDetails the details to create the vehicle booking
   * @returns the database insert result
   */
  static async createVehicleBooking(bookingDetails) {
    const query = 'INSERT INTO bookings SET ?';
    const params = bookingDetails;

    const result = await Database.executeQuery(query, params);

    return result;
  }
}

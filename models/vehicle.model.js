import { Database } from '../config/db.config.js';
import { VEHICLE_CATEGORY_TYPES } from '../helpers/constants.js';

export class VehicleModel {
  /**
   * @description
   * this method groups vehicles by a category type and then fetches the values for that category
   * @param {string} categoryType the category type (class or wheels) by which vehicles would be grouped
   * @returns the database fetch result
   */
  static async getVehicleCategoriesByType(categoryType = `${VEHICLE_CATEGORY_TYPES.WHEELS_TYPE}`) {
    const query = `SELECT ${categoryType} FROM vehicles GROUP BY ${categoryType}`;

    const result = await Database.executeQuery(query);

    return result;
  }

  /**
   * @description
   * this method groups vehicles by class for a particular no of wheels and then fetches the class values based on no of wheels
   * @param {number} noOfWheels no of wheels for which vehicle categories (class) are to be fetched
   * @returns the database fetch results
   */
  static async getVehicleCategoriesFromWheels(noOfWheels) {
    const query = `SELECT class FROM vehicles WHERE wheels = ${noOfWheels} GROUP BY class`;

    const result = await Database.executeQuery(query);

    return result;
  }

  /**
   * @description
   * this method groups vehicles by type for a particular category and then fetches all vehicle types
   * @param {string} category the category for which vehicle types are to be fetched
   * @param {string} categoryAttribute the category attribute (class or wheels) for which vehicle types are to be fetched
   * @returns the database fetch result
   */
  static async getVehicleTypesByCategory(category, categoryAttribute = `${VEHICLE_CATEGORY_TYPES.CLASS_TYPE}`) {
    const query = `SELECT type FROM vehicles WHERE ${categoryAttribute} = '${category}' GROUP BY type`;

    const result = await Database.executeQuery(query);

    return result;
  }

  /**
   * @description
   * this method fethes vehicle models along with their companies for a vehicle type
   * @param {string} type the vehicle type for which models and their companies are to be fetched
   * @returns the database fetch result
   */
  static async getVehicleModels(type) {
    const query = `SELECT model, company FROM vehicles WHERE type = '${type}'`;

    const result = await Database.executeQuery(query);

    return result;
  }

  /**
   * @description
   * this method fetches a vehicle by its id
   * @param {number} vehicleId the id of the vehicle to be fetched
   * @returns the database fetch result
   */
  static async getVehicleDetailsById(vehicleId) {
    const query = 'SELECT * FROM vehicles WHERE id = ?';
    const params = [vehicleId];

    const result = await Database.executeQuery(query, params);

    return result;
  }

  /**
   * @description
   * this method updates a vehicle's booking status on successful creation of a booking
   * @param {number} vehicleId the id of the vehicle for which booking status is to be updated
   * @param {boolean} status the booking status
   * @returns the database update result
   */
  static async updateVehicleBookingStatus(vehicleId, status = true) {
    const query = 'UPDATE vehicles SET isBooked = ? WHERE id = ?';
    const params = [status, vehicleId];

    const result = await Database.executeQuery(query, params);

    return result;
  }
}

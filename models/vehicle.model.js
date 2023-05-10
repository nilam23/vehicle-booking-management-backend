import { Database } from '../config/db.config.js';

export class VehicleModel {
  /**
   * @description
   * the following method groups vehicles by a category type and then fetches the values for that category
   * @param {string} categoryType the category type (class or wheels) by which vehicles would be grouped
   * @returns the database fetch result
   */
  static async getVehicleCategoriesByType(categoryType) {
    const query = `SELECT ${categoryType} FROM vehicles GROUP BY ${categoryType}`;

    const result = await Database.executeQuery(query);

    return result;
  }
}

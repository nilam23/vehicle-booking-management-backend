import { HTTP_STATUS_CODES, VEHICLE_CATEGORY_TYPES } from '../helpers/constants.js';
import { AppError } from '../helpers/error.js';
import { isAllowed, sendResponse } from '../helpers/utils.js';
import { VehicleModel } from '../models/vehicle.model.js';

export class VehicleController {
  /**
   * @description
   * the controller method to fetch all category values for a vehicle category type
   * @param {object} req the request object
   * @param {object} res the response object
   * @param {object} next the next middleware function in the application’s request-response cycle
   * @returns the array of values for the vehicle category type
   */
  static async getVehicleCategories(req, res, next) {
    try {
      let categoryType = req.query.type;

      if (!categoryType) categoryType = VEHICLE_CATEGORY_TYPES.WHEELS_TYPE;

      if (!isAllowed(categoryType, VEHICLE_CATEGORY_TYPES)) return next(new AppError(`${categoryType} is not a valid category type`, HTTP_STATUS_CODES.BAD_REQUEST));

      const vehicleCategoriesFetchResult = await VehicleModel.getVehicleCategoriesByType(categoryType);

      const vehicleCategories = [];

      vehicleCategoriesFetchResult.forEach((result) => vehicleCategories.push(result[Object.keys(result)[0]]));

      return sendResponse(res, HTTP_STATUS_CODES.OK, `Vehicle categories by ${categoryType} fetched`, vehicleCategories);
    } catch (error) {
      return next(new AppError(error.message || 'Internal Server Error', HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, error.response || error));
    }
  }
}

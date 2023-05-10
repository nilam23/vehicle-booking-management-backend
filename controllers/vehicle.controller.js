import { HTTP_STATUS_CODES, VEHICLE_CATEGORY_TYPES } from '../helpers/constants.js';
import { AppError } from '../helpers/error.js';
import { _isEmptyObject, sendResponse } from '../helpers/utils.js';
import { VehicleModel } from '../models/vehicle.model.js';

export class VehicleController {
  /**
   * @description
   * the controller method to fetch all wheels types
   * @param {object} req the request object
   * @param {object} res the response object
   * @param {object} next the next middleware function in the application’s request-response cycle
   * @returns the array of wheels types
   */
  static async getVehicleCategoriesByWheels(_, res, next) {
    try {
      const categoryType = VEHICLE_CATEGORY_TYPES.WHEELS_TYPE;

      const vehicleCategoriesFetchResult = await VehicleModel.getVehicleCategoriesByType();

      if (_isEmptyObject(vehicleCategoriesFetchResult)) return next(new AppError(`No vehicle categories found for the category type '${categoryType}'`, HTTP_STATUS_CODES.NOT_FOUND));

      const vehicleCategories = [];

      vehicleCategoriesFetchResult.forEach((result) => vehicleCategories.push(result[Object.keys(result)[0]]));

      return sendResponse(res, HTTP_STATUS_CODES.OK, `Vehicle categories by '${categoryType}' fetched`, vehicleCategories);
    } catch (error) {
      return next(new AppError(error.message || 'Internal Server Error', HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, error.response || error));
    }
  }

  /**
   * @description
   * the controller method to fetch all vehicle categories as per wheels type
   * @param {object} req the request object
   * @param {object} res the response object
   * @param {object} next the next middleware function in the application’s request-response cycle
   * @returns the array of vehicle categories
   */
  static async getVehicleCategoriesFromWheels(req, res, next) {
    try {
      if (_isEmptyObject(req.query)) return next(new AppError('Please provide no of wheels to fetch categories', HTTP_STATUS_CODES.BAD_REQUEST));

      const noOfWheels = req.query.wheels;

      const vehicleCategoriesFetchResult = await VehicleModel.getVehicleCategoriesFromWheels(noOfWheels);

      if (_isEmptyObject(vehicleCategoriesFetchResult)) return next(new AppError(`No vehicle categories found for ${noOfWheels} wheelers`, HTTP_STATUS_CODES.NOT_FOUND));

      const vehicleCategories = [];

      vehicleCategoriesFetchResult.forEach((result) => vehicleCategories.push(result.class));

      return sendResponse(res, HTTP_STATUS_CODES.OK, `Vehicle categories fetched for ${noOfWheels} wheelers`, vehicleCategories);
    } catch (error) {
      return next(new AppError(error.message || 'Internal Server Error', HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, error.response || error));
    }
  }

  /**
   * @description
   * the controller method to fetch all vehicle types for a category
   * @param {object} req the request object
   * @param {object} res the response object
   * @param {object} next the next middleware function in the application’s request-response cycle
   * @returns the array of vehicle types
   */
  static async getVehicleTypes(req, res, next) {
    try {
      if (_isEmptyObject(req.query)) return next(new AppError('Please provide a category to fetch vehicle types', HTTP_STATUS_CODES.BAD_REQUEST));

      const vehicleCategory = req.query.category;

      const vehicleTypesFetchResult = await VehicleModel.getVehicleTypesByCategory(vehicleCategory);

      if (_isEmptyObject(vehicleTypesFetchResult)) return next(new AppError(`No vehicle types found for '${vehicleCategory}' category`, HTTP_STATUS_CODES.NOT_FOUND));

      const vehicleTypes = [];

      vehicleTypesFetchResult.forEach((result) => vehicleTypes.push(result.type));

      return sendResponse(res, HTTP_STATUS_CODES.OK, `Vehicle types fetched for '${vehicleCategory}' category`, vehicleTypes);
    } catch (error) {
      return next(new AppError(error.message || 'Internal Server Error', HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, error.response || error));
    }
  }

  /**
   * @description
   * the controller method to fetch all vehicle models along with their companies for a type
   * @param {object} req the request object
   * @param {object} res the response object
   * @param {object} next the next middleware function in the application’s request-response cycle
   * @returns the array of vehicle models along with their companies
   */
  static async getVehicleModels(req, res, next) {
    try {
      if (_isEmptyObject(req.query)) return next(new AppError('Please provide a vehicle type', HTTP_STATUS_CODES.BAD_REQUEST));

      const vehicleType = req.query.type;

      const vehicleModelsFetchResult = await VehicleModel.getVehicleModels(vehicleType);

      if (_isEmptyObject(vehicleModelsFetchResult)) return next(new AppError(`No vehicle models found for '${vehicleType}' type`, HTTP_STATUS_CODES.NOT_FOUND));

      const vehicleModels = [];

      vehicleModelsFetchResult.forEach((result) => vehicleModels.push({
        model: result.model,
        company: result.company,
      }));

      return sendResponse(res, HTTP_STATUS_CODES.OK, `Vehicle models fetched for '${vehicleType}' type`, vehicleModels);
    } catch (error) {
      return next(new AppError(error.message || 'Internal Server Error', HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, error.response || error));
    }
  }
}

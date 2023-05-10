import { VehicleController } from '../controllers/vehicle.controller.js';

/**
 * @description
 * routes responsible for vehicle management
 * @param {object} app the express application instance
 */
export const vehicleRoutes = (app) => {
  app
    .route('/vehicles/categories')
    .get(VehicleController.getVehicleCategories);
};

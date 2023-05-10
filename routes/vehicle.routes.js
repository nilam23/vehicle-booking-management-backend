import { VehicleController } from '../controllers/vehicle.controller.js';

/**
 * @description
 * routes responsible for vehicle management
 * @param {object} app the express application instance
 */
export const vehicleRoutes = (app) => {
  app
    .route('/vehicles/categories/wheels')
    .get(VehicleController.getVehicleCategoriesByWheels);

  app
    .route('/vehicles/categories')
    .get(VehicleController.getVehicleCategoriesFromWheels);

  app
    .route('/vehicles/types')
    .get(VehicleController.getVehicleTypes);

  app
    .route('/vehicles/models')
    .get(VehicleController.getVehicleModels);
};

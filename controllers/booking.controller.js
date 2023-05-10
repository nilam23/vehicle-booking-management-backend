import {
  COOKIE_KEY_FOR_BOOKING_INFO,
  EXPIRY_OF_BOOKING_INFO_COOKIE,
  HTTP_STATUS_CODES,
  REQUIRED_DATE_FIELDS_FOR_VEHICLE_BOOKING,
  REQUIRED_USER_FIELDS_FOR_VEHICLE_BOOKING,
  REQUIRED_VEHICLE_BOOKING_FIELDS
} from '../helpers/constants.js';
import { AppError } from '../helpers/error.js';
import {
  _isEmptyObject,
  areAllFieldsAvailable,
  saveCookie,
  sendResponse
} from '../helpers/utils.js';
import { VehicleBookingModel } from '../models/booking.model.js';
import { VehicleModel } from '../models/vehicle.model.js';

export class VehicleBookingController {
  /**
   * @description
   * this controller method recieves information of the user for vehicle booking and attaches the same with a cookie
   * @param {object} req the request object
   * @param {object} res the response object
   * @param {object} next the next middleware function in the application’s request-response cycle
   */
  static async receiveUserInfo(req, res, next) {
    if (_isEmptyObject(req.body)) return next(new AppError('Please provide user first name as firstName and last name as lastName', HTTP_STATUS_CODES.BAD_REQUEST));

    if (!areAllFieldsAvailable(req.body, Object.values(REQUIRED_USER_FIELDS_FOR_VEHICLE_BOOKING))) return next(new AppError('Please provide all necessary user details', HTTP_STATUS_CODES.BAD_REQUEST));

    const { firstName, lastName } = req.body;

    if (!_isEmptyObject(req.cookies[`${COOKIE_KEY_FOR_BOOKING_INFO}`])) res.clearCookie(`${COOKIE_KEY_FOR_BOOKING_INFO}`);

    saveCookie(res, COOKIE_KEY_FOR_BOOKING_INFO, { firstName, lastName }, EXPIRY_OF_BOOKING_INFO_COOKIE);

    return sendResponse(res, HTTP_STATUS_CODES.OK, 'User information received', req.body);
  }

  /**
   * @description
   * this controller method recieves vehicle booking dates and attaches a cookie for the same along with user details
   * @param {object} req the request object
   * @param {object} res the response object
   * @param {object} next the next middleware function in the application’s request-response cycle
   */
  static async receiveBookingDates(req, res, next) {
    if (_isEmptyObject(req.body)) return next(new AppError('Please provide booking start date and end date', HTTP_STATUS_CODES.BAD_REQUEST));

    if (!areAllFieldsAvailable(req.body, Object.values(REQUIRED_DATE_FIELDS_FOR_VEHICLE_BOOKING))) return next(new AppError('Please provide all necessary booking dates', HTTP_STATUS_CODES.BAD_REQUEST));

    if (_isEmptyObject(req.cookies[`${COOKIE_KEY_FOR_BOOKING_INFO}`])) return next(new AppError('User first name and last name are missing', HTTP_STATUS_CODES.BAD_REQUEST));

    const cookieDetails = req.cookies[`${COOKIE_KEY_FOR_BOOKING_INFO}`];

    const { startDate, endDate } = req.body;

    cookieDetails.startDate = startDate;
    cookieDetails.endDate = endDate;

    res.clearCookie(`${COOKIE_KEY_FOR_BOOKING_INFO}`);
    saveCookie(res, COOKIE_KEY_FOR_BOOKING_INFO, cookieDetails, EXPIRY_OF_BOOKING_INFO_COOKIE);

    return sendResponse(res, HTTP_STATUS_CODES.OK, 'Booking dates received', req.body);
  }

  /**
   * @description
   * this controller method recieves vehicle booking details and then creates a booking for the vehicle
   * @param {object} req the request object
   * @param {object} res the response object
   * @param {object} next the next middleware function in the application’s request-response cycle
   */
  static async createVehicleBooking(req, res, next) {
    if (_isEmptyObject(req.body)) return next(new AppError('Please provide all necessary details to create the vehicle booking', HTTP_STATUS_CODES.BAD_REQUEST));

    if (!areAllFieldsAvailable(req.body, Object.values(REQUIRED_VEHICLE_BOOKING_FIELDS))) return next(new AppError('Some fields are missing to create the vehicle booking', HTTP_STATUS_CODES.BAD_REQUEST));

    try {
      const fetchVehicleDetailsResult = await VehicleModel.getVehicleDetailsById(req.body.vehicleId);

      if (_isEmptyObject(fetchVehicleDetailsResult[0])) return next(new AppError(`No vehicle found corresponding to the id ${req.body.vehicleId}`, HTTP_STATUS_CODES.NOT_FOUND));

      if (fetchVehicleDetailsResult[0].isBooked) return next(new AppError(`Vehicle with id ${req.body.vehicleId} is already booked`, HTTP_STATUS_CODES.BAD_REQUEST));

      const createVehicleBookingResult = await VehicleBookingModel.createVehicleBooking(req.body);

      if (createVehicleBookingResult.affectedRows) {
        await VehicleModel.updateVehicleBookingStatus(req.body.vehicleId);
      } else return next(new AppError('Vehicle booking could not be created', HTTP_STATUS_CODES.BAD_REQUEST));

      return sendResponse(res, HTTP_STATUS_CODES.CREATED, 'Vehicle has been booked', req.body);
    } catch (error) {
      return next(new AppError(error.message || 'Internal Server Error', HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, error.response || error));
    }
  }
}

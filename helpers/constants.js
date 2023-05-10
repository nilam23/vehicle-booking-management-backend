/**
 * different http codes to be used in the application
 */
export const HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

/**
 * allowed types to fetch vehicle categories from database
 */
export const VEHICLE_CATEGORY_TYPES = {
  WHEELS_TYPE: 'wheels',
  CLASS_TYPE: 'class'
};

/**
 * necessary user fields for vehicle booking
 */
export const REQUIRED_USER_FIELDS_FOR_VEHICLE_BOOKING = {
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName'
};

/**
 * necessary booking date fields for vehicle booking
 */
export const REQUIRED_DATE_FIELDS_FOR_VEHICLE_BOOKING = {
  START_DATE: 'startDate',
  END_DATE: 'endDate'
};

/**
 * necessary fields to create a vehicle booking
 */
export const REQUIRED_VEHICLE_BOOKING_FIELDS = {
  USER_FIRST_NAME: 'userFirstName',
  USER_LAST_NAME: 'userLastName',
  BOOKING_START_DATE: 'bookingStartDate',
  BOOKING_END_DATE: 'bookingEndDate',
  VEHICLE_ID: 'vehicleId'
};

/**
 * key to be used while creating a cookie with user information for vehicle booking
 */
export const COOKIE_KEY_FOR_BOOKING_INFO = 'vehicleBookingInfo';

/**
 * expiry of the cookie (in seconds) created to store user information for vehicle booking
 */
export const EXPIRY_OF_BOOKING_INFO_COOKIE = 60000;

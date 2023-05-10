/**
 * @description
 * the following method is responsible for sending response back to the client
 * @param {object} res the response object
 * @param {number} statusCode the http status code
 * @param {string} message the response message
 * @param {object} data the data to be sent back to the client
 * @param {object} error the error object, when exists
 * @returns the response to be sent back to the client
 */
export const sendResponse = (res, statusCode, message, data = [], error = {}) => res.status(statusCode).json({
  statusCode,
  message,
  data,
  error
});

/**
 * @description
 * the following method checks whether a particular value exists in a target object
 * @param {string} targetValue the value which needs to be checked against an object
 * @param {object} targetObject the object where a value needs to be checked if it exists
 * @returns a boolean confirming the match
 */
export const isAllowed = (targetValue, targetObject) => {
  const targetValuesArray = Object.values(targetObject);

  if (targetValuesArray.includes(targetValue)) return true;
  return false;
};

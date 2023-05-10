/**
 * @description
 * this method is responsible for sending response back to the client
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
 * this method checks whether a particular value exists in a target object
 * @param {string} targetValue the value which needs to be checked against an object
 * @param {object} targetObject the object where a value needs to be checked if it exists
 * @returns a boolean confirming the match
 */
export const isAllowed = (targetValue, targetObject) => {
  const targetValuesArray = Object.values(targetObject);

  if (targetValuesArray.includes(targetValue)) return true;
  return false;
};

/**
 * @description
 * this method checks whether an object is an array
 * @param {object} targetObject the object which needs to be checked if its an array
 * @returns a boolean confirming the check
 */
export const _isArray = (targetObject) => targetObject instanceof Array;

/**
 * @description
 * this method checks if the input is an array
 * if array, returns it, else returns the keys array for the object
 * @param {object} targetObject the object which needs to converted to an array (if not an array already)
 * @returns an array
 */
export const _getArray = (targetObject) => (_isArray(targetObject) ? targetObject : Object.keys(targetObject));

/**
 * @description
 * this method fetches the size of an object by converting it to an array (if not an array already)
 * @param {object} targetObject the object for which size needs to be fetched
 * @returns the size of the object
 */
export const _size = (targetObject) => (targetObject ? _getArray(targetObject).length : 0);

/**
 * @description
 * this method checks if an object is empty
 * @param {object} targetObject the object which needs to be checked if its empty
 * @returns a boolean confirming the check
 */
export const _isEmptyObject = (targetObject) => _size(targetObject) === 0;

/**
* @typedef ApiMeta
* @property {boolean} success response status - eg: true
* @property {string} message
*/

/**
 * @typedef ApiResponse
 * @property {boolean} success - Success status - eg: true
 * @property {ApiMeta.model} meta - List response property
 * @property {object} data - Data returned array or object
 * @property {strings} statusCode - Status success code 000 - eg: 000
 */

/**
 * @typedef ApiError
 * @property {boolean} success - Success status - eg: false
 * @property {string} message - List response property
 * @property {string} detail - Detail of error returned
 * @property {strings} statusCode - Status error code 001,002,003,004 - eg: 001
 */

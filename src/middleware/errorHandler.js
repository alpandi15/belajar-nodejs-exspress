import { logException } from '../services/utils/responseHandlingService'

const errorHandler = (err, req, res, next) => {
  // console.log('ERROR HANDLER ', err)
  if (err.name === 'ApiError') {
    const errorId = logException(err.details)
    return res.status(err.code).json({
      id: errorId,
      success: false,
      message: err.message,
      detail: typeof err.details === 'object' ? err.details : err.details.toString().split('\n')[0],
      statusCode: err.statusCode
    }).end()
  } else { return next(err) }
}

export default errorHandler

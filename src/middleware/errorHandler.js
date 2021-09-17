import { logException } from '../services/utils/responseHandlingService'

const errorHandler = (err, req, res, next) => {
  console.log('ERROR HANDLER ', err)
  if (err.name === 'ApiError') {
    const errorId = logException(err.details)
    res.status(err.code).json({
      id: errorId, success: false, message: err.message, detail: typeof err.details === 'object' ? err.details : err.details.toString().split('\n')[0]
    }).end()
  } else { next(err) }
}

export default errorHandler

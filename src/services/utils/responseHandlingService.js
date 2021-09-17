import {v4 as uuidv4} from 'uuid'

export const logException = (err) => {
  const errorId = uuidv4()
  console.error(errorId, err)
  return errorId
}

export const ApiResponse = (res, resCode = 200, statusCode = 0, data = {}, meta = {}) => {
  res.status(resCode).json({
    success: true,
    meta,
    data,
    statusCode
  })
}

export function ApiError (resCode, statusCode = 1, message, details) {
  this.name = 'ApiError'
  this.code = resCode
  this.message = message
  this.details = details
  this.statusCode = statusCode
}
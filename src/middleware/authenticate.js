import {ApiError} from '#services/utils/responseHandlingService'
import {extractTokenProfile} from '#services/utils/securityService'

export const requireAuth = (req, res, next) => {
  try {
    if (!req?.headers?.authorization) {
      return next(new ApiError(401, '003', 'Unauthorize', 'Required token'))
    }

    const headerAuth = req?.headers?.authorization.split(' ')
    if (headerAuth[0] !== 'Bearer') {
      return next(new ApiError(401, '003', 'Unauthorize', 'Required Bearer token'))
    }

    const decode = extractTokenProfile(req)
    req.user = decode
    // console.log('Headers ', req);
    next()
  } catch (error) {
    return next(new ApiError(400, '004', 'Unauthorize', error.stack))
  }
}
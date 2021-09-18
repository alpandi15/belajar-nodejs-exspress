import {create, getOne} from '#services/userService'
import {ApiResponse, ApiError} from '#services/utils/responseHandlingService'

export const registerUser = async (req, res, next) => {
  try {
    const createUser = await create(req.body)
    if (createUser) {
      return ApiResponse(res, 200, '000', createUser, {
        message: 'Success create users'
      })
    }
    return next(new ApiError(422, '001', 'Failed to create user', 'Data gagal di input'))
  } catch (error) {
    // console.log('ERROR ', error.errors);
    return next(new ApiError(422, '002', 'Internal server error', error))
  }
}

export const getUser = async (req, res, next) => {
  console.log('Req ', req?.params?.id)
  try {
    const data = await getOne(req?.params?.id)
    if (data) {
      return ApiResponse(res, 200, 0, data, {
        message: 'Success create users'
      })
    }
    return next(new ApiError(422, '001', 'User tidak di temkan', 'User not found'))
  } catch (error) {
    // console.log('ERROR ', error.stack);
    return next(new ApiError(422, '002', 'Internal server error', error.stack))
  }
}
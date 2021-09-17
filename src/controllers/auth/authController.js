import {create} from '#services/userService'
import {ApiResponse, ApiError} from '#services/utils/responseHandlingService'

export const registerUser = async (req, res, next) => {
  try {
    const createUser = await create(req.body)
    console.log('CREATE ', createUser);
    if (createUser) {
      return next(new ApiResponse(res, 200, 0, createUser, {
        message: 'Success create users'
      }))
    }
  } catch (error) {
    // console.log('ERROR ', error.errors);
    return next(new ApiError(422, 1, 'Failed to create user', error))
  }
}
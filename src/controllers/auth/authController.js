import {create, getOne, getAccount} from '#services/userService'
import {ApiResponse, ApiError} from '#services/utils/responseHandlingService'
import {generatePassword, isValidPassword, generateToken} from '#services/utils/securityService'
import project from '#config/project.config'

/**
 * This function comment is parsed by doctrine
 * @route GET /api
 * @group foo - Operations about user
 * @param {string} email.query.required - username or email - eg: user@domain
 * @param {string} password.query.required - user's password.
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
export const registerUser = async (req, res, next) => {
  try {
    const password = await generatePassword(String(req?.body?.password))

    const createUser = await create({
      name: req?.body?.name,
      email: req?.body?.email,
      username: req?.body?.username,
      password
    })
    if (createUser) {
      return ApiResponse(res, 200, '000', createUser, {
        message: 'Success create users'
      })
    }
    return next(new ApiError(422, '001', 'Failed to create user', 'Data gagal di input'))
  } catch (error) {
    return next(new ApiError(500, '002', 'Internal server error', error.stack))
  }
}

export const getMyProfile = async (req, res, next) => {
  try {
    const data = await getOne(req?.user?.id)
    if (!data) return next(new ApiError(422, '001', 'User tidak di temkan', 'User not found'))

    return ApiResponse(res, 200, '000', data, {
      message: 'Success get profile'
    })
  } catch (error) {
    return next(new ApiError(500, '002', 'Internal server error', error.stack))
  }
}

export const login = async (req, res, next) => {
  try {
    // cek data user
    const data = await getAccount(req?.body?.account)
    if (!data) {
      return next(new ApiError(422, '001', 'User tidak di temkan', 'User not found'))
    }

    // cek password valid
    const isValid = await isValidPassword(req?.body?.password, data?.password)
    if (!isValid) {
      return next(new ApiError(422, '001', 'Password anda salah', 'Wrong Password'))
    }

    const responseData = {
      token_type: 'Bearer',
      access_token: await generateToken(data.get()),
      expires_in: project.auth_expire
    }
    // response success login
    return ApiResponse(res, 200, '000', responseData, {
      message: 'Success Login'
    })
  } catch (error) {
    return next(new ApiError(500, '002', 'Internal server error', error.stack))
  }
}
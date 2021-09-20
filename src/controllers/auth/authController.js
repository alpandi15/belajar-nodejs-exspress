import {create, getOne, getAccount} from '#services/userService'
import {ApiResponse, ApiError} from '#services/utils/responseHandlingService'
import {generatePassword, isValidPassword, generateToken, extractTokenProfile} from '#services/utils/securityService'
import project from '#config/project.config'

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
    return next(new ApiError(500, '002', 'Internal server error', error))
  }
}

export const getMyProfile = async (req, res, next) => {
  try {
    const dataToken = extractTokenProfile(req)
    if (!dataToken) return next(new ApiError(422, '001', 'Token invalid', 'User not found'))

    const data = await getOne(dataToken?.id)
    if (!data) return next(new ApiError(422, '001', 'User tidak di temkan', 'User not found'))

    return ApiResponse(res, 200, 0, data, {
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
    return ApiResponse(res, 200, 0, responseData, {
      message: 'Success Login'
    })
  } catch (error) {
    return next(new ApiError(500, '002', 'Internal server error', error.stack))
  }
}
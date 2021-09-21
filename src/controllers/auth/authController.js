import {create, getOne, getAccount, isAccountExist} from '#services/userService'
import {ApiResponse, ApiError} from '#services/utils/responseHandlingService'
import {generatePassword, isValidPassword, generateToken} from '#services/utils/securityService'
import project from '#config/project.config'
import {check, validationResult} from 'express-validator'
import responseCode from '../../constant/responseStatus'

export const validation = (method) => {
  switch (method) {
    case 'login': {
      return [
        check('account').notEmpty().withMessage('Required'),
        check('password').notEmpty().withMessage('Password requreid').isLength({ min: 6}).withMessage('Minimum 6 characters').trim(),
      ]
    }
  }
}

// Annotation Models
/**
 * @typedef LoginModel
 * @property {string} account.required - account user email or username - eg: pandi@gmail.com
 * @property {string} password.required - password - eg: 111111
 */

/**
 * @typedef RegisterModel
 * @property {string} name.required - your name - eg: Jhon Doe
 * @property {string} email.required - your email - eg: jhondoe@mail.com
 * @property {string} username.required - your username - eg: jhon_doe
 * @property {string} password.required - yout password - eg: 123456
 */

/**
 * To login application user
 * @route POST /auth/register
 * @group Auth - Authentication
 * @param {RegisterModel.model} request.body.required - params for login user
 * @produces application/json
 * @consumes application/json
 * @returns {ApiResponse.model} 200 - Example to success response
 * @returns {ApiError.model} 422 - Example to error response
 */
export const registerUser = async (req, res, next) => {
  try {
    // cek data user
    const checkEmail = await isAccountExist(req?.body?.email)
    if (checkEmail) return next(new ApiError(422, responseCode.account_is_exist.code, responseCode.account_is_exist.message, 'Email sudah terdaftar, silahkan login'))

    const checkUsername = await isAccountExist(req?.body?.username)
    if (checkUsername) return next(new ApiError(422, responseCode.account_is_exist.code, responseCode.account_is_exist.message, 'Username sudah terdaftar, silahkan login'))

    const password = await generatePassword(String(req?.body?.password))

    const createUser = await create({
      name: req?.body?.name,
      email: req?.body?.email,
      username: req?.body?.username,
      password
    })
    if (createUser) {
      return ApiResponse(res, 200, responseCode.success.code, createUser, {
        message: 'Success create users'
      })
    }
    return next(new ApiError(422, responseCode.error.code, 'Failed to create user', 'Data gagal di input'))
  } catch (error) {
    return next(new ApiError(500, responseCode.internal_error.code, responseCode.internal_error.detail, error.stack))
  }
}

/**
 * To get session user with token
 * @route GET /auth/me
 * @group Auth - Authentication
 * @produces application/json
 * @consumes application/json
 * @returns {ApiResponse.model} 200 - Example to success response
 * @returns {ApiError.model} 422 - Example to error response
 * @security JWT
 */
export const getMyProfile = async (req, res, next) => {
  try {
    const data = await getOne(req?.user?.id)
    if (!data) return next(new ApiError(422, responseCode.not_found.code, 'User tidak di temukan', 'User not found'))

    return ApiResponse(res, 200, responseCode.success.code, data, {
      message: 'Success get profile'
    })
  } catch (error) {
    return next(new ApiError(500, responseCode.internal_error.code, 'Internal server error', error.stack))
  }
}

/**
 * To login application user
 * @route POST /auth/login
 * @group Auth - Authentication
 * @param {LoginModel.model} request.body.required - params for login user
 * @produces application/json
 * @consumes application/json
 * @returns {ApiResponse.model} 200 - Example to success response
 * @returns {ApiError.model} 422 - Example to error response
 */
export const login = async (req, res, next) => {
  try {
    const validate = validationResult(req)
    console.log('VALIDET ', validate.isEmpty());
    if (!validate.isEmpty()) {
      return next(new ApiError(422, responseCode.param_error.code, responseCode.param_error.message, validate.array()))
    }
    // cek data user
    const data = await getAccount(req?.body?.account)
    if (!data) {
      return next(new ApiError(422, responseCode.not_found.code, responseCode.not_found.message, 'User not found'))
    }

    // cek password valid
    const isValid = await isValidPassword(req?.body?.password, data?.password)
    if (!isValid) {
      return next(new ApiError(422, responseCode.wrong_password.code, responseCode.wrong_password.message, 'Wrong Password'))
    }

    const responseData = {
      token_type: 'Bearer',
      access_token: await generateToken(data.get()),
      expires_in: project.auth_expire
    }
    // response success login
    return ApiResponse(res, 200, responseCode.success.code, responseData, {
      message: 'Success Login'
    })
  } catch (error) {
    return next(new ApiError(500, responseCode.internal_error.code, responseCode.internal_error.message, error.stack))
  }
}
import {
  getBySlug,
  createData,
  updateData,
  deleteBySlug,
  getAll,
  dataExists,
  getMyList
} from '../../services/postService'
import {ApiResponse, ApiError} from '#services/utils/responseHandlingService'
import responseCode from '../../constant/responseStatus'
import {check, validationResult} from 'express-validator'
import {v4 as uuidV4} from 'uuid'

export const validation = (method) => {
  switch (method) {
    case 'create': {
      return [
        check('content').notEmpty().withMessage('Required')
      ]
    }
    case 'update': {
      return [
        check('content').notEmpty().withMessage('Required')
      ]
    }
  }
}

/**
 * @typedef CreateModel
 * @property {string} content.required - your content - eg: Home alone...
 */

/**
 * To Post CRUD
 * @route GET /post/{slug}
 * @group Post - To Post CRUD
 * @param {string} slug.path.required - slug of data
 * @returns {ApiResponse.model} 200 - An object of data
 * @returns {ApiError.model} 404 - Couldn't find Data.
 */
export const findOne = async (req, res, next) => {
  try {
    const data = await getBySlug(req?.params?.slug)
    if (!data) {
      return next(new ApiError(404, responseCode.not_found.code, responseCode.not_found.message, 'Data tidak di temukan'))
    }
    return ApiResponse(res, 200, responseCode.success.code, data, {
      message: 'Success'
    })
  } catch (error) {
    return next(new ApiError(500, responseCode.internal_error.code, responseCode.internal_error.detail, error.stack))
  }
}

/**
 * To Post CRUD
 * @route GET /post
 * @group Post - To get all post
 * @returns {ApiResponse.model} 200 - An object of data
 * @returns {ApiError.model} 404 - Couldn't find Data.
 */
export const findAll = async (req, res, next) => {
  try {
    const data = await getAll(req)
    return ApiResponse(res, 200, responseCode.success.code, data, {
      message: 'Success'
    })
  } catch (error) {
    return next(new ApiError(500, responseCode.internal_error.code, responseCode.internal_error.detail, error.stack))
  }
}

/**
 * To Post CRUD
 * @route GET /my-post
 * @group Post - To get all my post
 * @returns {ApiResponse.model} 200 - An object of data
 * @returns {ApiError.model} 404 - Couldn't find Data.
 * @security JWT
 */
export const findMyList = async (req, res, next) => {
  try {
    const data = await getMyList(req?.user?.id)
    return ApiResponse(res, 200, responseCode.success.code, data, {
      message: 'Success'
    })
  } catch (error) {
    return next(new ApiError(500, responseCode.internal_error.code, responseCode.internal_error.detail, error.stack))
  }
}

/**
 * To create new post
 * @route POST /post
 * @group Post - Create new post
 * @param {CreateModel.model} request.body.required - params for create
 * @produces application/json
 * @consumes application/json
 * @returns {ApiResponse.model} 200 - Example to success response
 * @returns {ApiError.model} 422 - Example to error response
 * @security JWT
 */
export const create = async (req, res, next) => {
  try {
    const validate = validationResult(req)
    if (!validate.isEmpty()) {
      return next(new ApiError(422, responseCode.param_error.code, responseCode.param_error.message, validate.array()))
    }

    const created = await createData({
      slug: uuidV4(),
      content: req?.body?.content
    }, req?.user?.id)

    return ApiResponse(res, 200, responseCode.success.code, created, {
      message: 'Success'
    })
  } catch (error) {
    return next(new ApiError(500, responseCode.internal_error.code, responseCode.internal_error.detail, error.stack))
  }
}

/**
 * To update post
 * @route PUT /post/{slug}
 * @group Post - Update post
 * @param {string} slug.path.required - slug of data
 * @param {CreateModel.model} request.body.required - params for create
 * @produces application/json
 * @consumes application/json
 * @returns {ApiResponse.model} 200 - Example to success response
 * @returns {ApiError.model} 422 - Example to error response
 * @security JWT
 */
export const update = async (req, res, next) => {
  try {
    const exists = await dataExists(req?.params?.slug)
    if (!exists) {
      return next(new ApiError(404, responseCode.not_found.code, responseCode.not_found.message, 'Data tidak di temukan'))
    }

    const updated = await updateData(req?.params?.slug, {
      content: req?.body?.content
    })
    if (!updated) {
      return next(new ApiError(404, responseCode.not_found.code, responseCode.not_found.message, 'Data tidak di temukan'))
    }

    const dataUpdated = await getBySlug(req?.params?.slug)
    return ApiResponse(res, 200, responseCode.success.code, dataUpdated, {
      message: 'Success Updated'
    })
    
  } catch (error) {
    return next(new ApiError(500, responseCode.internal_error.code, responseCode.internal_error.detail, error.stack))
  }
}

/**
 * To delete post
 * @route DELETE /post/{slug}
 * @group Post - Delete post
 * @param {string} slug.path.required - slug of data
 * @produces application/json
 * @consumes application/json
 * @returns {ApiResponse.model} 200 - Example to success response
 * @returns {ApiError.model} 422 - Example to error response
 * @security JWT
 */
export const destroy = async (req, res, next) => {
  try {
    const exists = await dataExists(req?.params?.slug)
    if (!exists) {
      return next(new ApiError(404, responseCode.not_found.code, responseCode.not_found.message, 'Data tidak di temukan'))
    }
    
    const deleted = await deleteBySlug(req?.params?.slug)
    if (!deleted) {
      return next(new ApiError(404, responseCode.not_found.code, responseCode.not_found.message, 'Data tidak di temukan'))
    }
    
    return ApiResponse(res, 200, responseCode.success.code, 'Has been deleted', {
      message: 'Success Deleted'
    })
  } catch (error) {
    return next(new ApiError(500, responseCode.internal_error.code, responseCode.internal_error.detail, error.stack))
  }
}

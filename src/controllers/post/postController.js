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

import {create} from '#services/uploadService'
import {ApiResponse, ApiError} from '#services/utils/responseHandlingService'
import responseCode from '../../constant/responseStatus'
import path from 'path'
import multer from 'multer'
import moment from 'moment'
import {v4 as uuidv4} from 'uuid'

const typeList = [
  'images',
  'files'
]

export function imageFilter (req, file, cb) {
  // accept image only
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return cb(new Error('Image format must be jpg or png!'), false)
  }
  cb(null, true)
}

/**
 * To uploading file
 * @route POST /upload/{type}
 * @group Upload Files - Upload files to server
 * @param {string} type.path.required - type of file - eg: images,files
 * @param {file} file.formData.required - file to upload
 * @returns {UploadResponse.model} 200 - An object of data
 * @returns {ApiError.model} 422 - Failed to insert data
 * @security JWT
 */
export const uploadFile = async (req, res, next) => {
  if (req.params.type && !(typeList.indexOf(req.params.type) > -1)) {
    return next(new ApiError(422, responseCode.error.code, responseCode.error.message, 'Unknown type'))
  }

  try {
    let filename
    const UPLOAD_PATH = path.join(__dirname, '../../public', req?.params?.type, moment().format('MMMYYYY'), '/')
    
    const storage = multer.diskStorage({
      destination: UPLOAD_PATH,
      filename: (req, file, cb) => {
        const nameUuid = uuidv4()
        filename = nameUuid + path.extname(file?.originalname)
        cb(null, filename)
      }
    })

    const uploading = multer({
      dest: UPLOAD_PATH,
      storage,
      fileFilter: imageFilter
    }).single('file')
    
    uploading(req, res, async (err) => {
      if (!req.file) {
        return next(new ApiError(422, responseCode.error.code, responseCode.error.message, err?.stack || 'Failed to read file, please check format'))
      }

      // response success
      const SIMPLE_PATH = path.join(req.params.type, moment().format('MMMYYYY'), filename)

      // save to table upload_files
      await create({
        url: SIMPLE_PATH,
        userId: req?.user?.id
      })
      return ApiResponse(res, 200, responseCode.success.code, {
        path: SIMPLE_PATH
      }, {
        message: 'Success'
      })
    })
  } catch (error) {
    return next(new ApiError(500, responseCode.internal_error.code, responseCode.internal_error.message, error.stack))
  }
}
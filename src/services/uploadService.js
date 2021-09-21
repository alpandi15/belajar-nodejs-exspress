import path from 'path'
import multer from 'multer'
import moment from 'moment'
import {v4 as uuidv4} from 'uuid'
import libSequelize from '#lib/sequelize'
import tables from '#database/models'

const tbl_upload_files = tables.upload_files

const homedir = require('os').homedir()

const Fields = [
  'id',
  'url',
  'createdAt',
  'updatedAt',
]
export function imageFilter (req, file, cb) {
  // accept image only
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return cb(new Error('Image format must be jpg or png!'), false)
  }
  cb(null, true)
}

export const uploadFile = async (req, res, type) => {
  try {
    let filename
    const UPLOAD_PATH = path.join(__dirname, '../public', type, moment().format('MMMYYYY'), '/')
    const storage = multer.diskStorage({
      destination: UPLOAD_PATH,
      filename: (req, file, cb) => {
        const nameUuid = uuidv4()
        filename = nameUuid + path.extname(file.originalname)
        cb(null, filename)
      }
    })

    const uploading = multer({
      dest: UPLOAD_PATH,
      storage,
      fileFilter: imageFilter
    }).single('file')
    console.log('UPLOADING ', uploading)

    uploading(req, res, async (err) => {
      if (!req.file) {
        return res.status(500).json({
          success: false,
          meta: { message: 'Failed to read file, please check format' },
          data: err
        })
      }
    })
    return uploading
  } catch (error) {
    throw new Error(error)
  }
}
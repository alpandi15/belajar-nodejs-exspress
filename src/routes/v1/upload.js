import express from 'express'
import {uploadFile, validation} from '../../controllers/upload/uploadController'
import {requireAuth} from '../../middleware/authenticate'
import {apiVersion} from '../version'

const router = express.Router()
const prefix = {
  upload: `${apiVersion}/upload/:type`,
}

router.post(prefix.upload, requireAuth, uploadFile)

export default router

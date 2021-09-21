import express from 'express'
import {uploadFile} from '../../controllers/upload/uploadController'
import {requireAuth} from '../../middleware/authenticate'
import {apiVersion} from '../version'

const router = express.Router()
const prefix = {
  upload: `${apiVersion}/upload/:type`,
}

router.post(prefix.upload, requireAuth, uploadFile)

export default router

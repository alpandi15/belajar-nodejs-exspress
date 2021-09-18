import express from 'express'
import {getUser} from '../../controllers/auth/authController'

const router = express.Router()
const prefix = {
  getOne: '/user/:id'
}

router.get(prefix.getOne, getUser)

export default router

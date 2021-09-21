import express from 'express'
import {registerUser, login, getMyProfile} from '../../controllers/auth/authController'
import {requireAuth} from '../../middleware/authenticate'
import {apiVersion} from '../version'

const router = express.Router()
const prefix = {
  login: `${apiVersion}/auth/login`,
  register: `${apiVersion}/auth/register`,
  myProfile: `${apiVersion}/auth/me`
}

router.post(prefix.login, login)
router.post(prefix.register, registerUser)
router.get(prefix.myProfile, requireAuth, getMyProfile)

export default router

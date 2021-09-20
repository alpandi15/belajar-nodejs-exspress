import express from 'express'
import {registerUser, login, getMyProfile} from '../../controllers/auth/authController'
import {requireAuth} from '../../middleware/authenticate'

const router = express.Router()
const prefix = {
    login: '/auth/login',
    register: '/auth/register',
    myProfile: '/auth/me'
}

router.post(prefix.login, login)
router.post(prefix.register, registerUser)
router.get(prefix.myProfile, requireAuth, getMyProfile)

export default router

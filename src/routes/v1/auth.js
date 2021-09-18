import express from 'express'
import {registerUser, login} from '../../controllers/auth/authController'

const router = express.Router()
const prefix = {
    login: '/auth/login',
    register: '/auth/register'
}

router.post(prefix.login, login)
router.post(prefix.register, registerUser)

export default router

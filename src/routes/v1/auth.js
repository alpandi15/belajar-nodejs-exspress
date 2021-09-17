import express from 'express'
import {registerUser} from '../../controllers/auth/authController'

const router = express.Router()
const prefix = {
    login: '/auth/login',
    register: '/auth/register'
}

router.get(prefix.login, (req, res) => {
    res.send('Login Bro')
})
router.post(prefix.register, registerUser)

export default router

import express from 'express'

const router = express.Router()
const prefix = {
    login: '/auth/login',
    register: '/auth/register'
}

router.get(prefix.login, (req, res) => {
    res.send('Login Bro')
})
router.get(prefix.register, (req, res) => {
    res.send('Register Bro')
})

export default router

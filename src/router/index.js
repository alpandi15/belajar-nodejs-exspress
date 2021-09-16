import authRouter from './v1/auth.js'

const routes = (app) => {
    app.get('/', (req, res) => {
        res.json({
            application: 'API Social Media',
            version: '1.0.0'
        })
    })
    app.use(authRouter)
}

export default routes

import authRouter from './v1/auth.js'

const routes = (app) => {
    app.get('/', (req, res) => {
        res.render('index', { title: 'Express' })
    })
    app.use(authRouter)
}

export default routes

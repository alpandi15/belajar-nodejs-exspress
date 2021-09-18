import authRouter from './v1/auth.js'
import userRouter from './v1/user'

const routes = (app) => {
  app.get('/', (req, res) => {
    res.render('index', { title: 'Express' })
  })
  app.use(authRouter)
  app.use(userRouter)
}

export default routes

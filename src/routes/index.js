import authRouter from './v1/auth.js'
import uploadRoute from './v1/upload'

const routes = (app) => {
  app.get('/', (req, res) => {
    res.render('index', { title: 'Express' })
  })
  app.use(authRouter)
  app.use(uploadRoute)
}

export default routes

import authRouter from './v1/auth.js'
import uploadRoute from './v1/upload'
import postRoute from './v1/post'
import commentRoute from './v1/comment'

const routes = (app) => {
  app.get('/', (req, res) => {
    res.render('index', { title: 'Express' })
  })
  app.use(authRouter)
  app.use(uploadRoute)
  app.use(postRoute)
  app.use(commentRoute)
}

export default routes

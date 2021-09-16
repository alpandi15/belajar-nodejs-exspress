import express from 'express'

import routes from './router/index.js'

const app = express()
routes(app)

app.listen(3000, () => {
    console.log('Server listening port 3000')
})
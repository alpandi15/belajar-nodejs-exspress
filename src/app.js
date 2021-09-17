import express from 'express'

import routes from '#routes'
import confing from '#config/project.config.js'

const app = express()
routes(app)

app.listen(confing.server_port, () => {
    console.log(`Server listening port ${confing.server_port}`)
})
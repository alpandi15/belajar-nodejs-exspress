
import dotenv from 'dotenv'

dotenv.config()

const environment = {
    server_port: process.env.PORT,
}

export default environment
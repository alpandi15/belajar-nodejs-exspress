import dotenv from 'dotenv'

dotenv.config()

const environment = {
    env: process.env.NODE_ENV || 'development',
    res_log_level: process.env.RESPONSE_LOG_LEVEL,
    server_port: process.env.PORT,

    db_url: process.env.DATABASE_URL,
    db_host: process.env.DATABASE_HOST,
    db_port: process.env.DATABASE_PORT,
    db_user: process.env.DATABASE_USER,
    db_pwd: process.env.DATABASE_PSWD,
    db_name: process.env.DATABASE_NAME,
    db_dialect: process.env.DATABASE_DIALECT,
    db_logging: process.env.DATABASE_LOGGING,
}

export default environment
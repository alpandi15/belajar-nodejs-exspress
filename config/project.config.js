import dotenv from 'dotenv'

dotenv.config()

const environment = {
    env: process.env.NODE_ENV || 'development',
    res_log_level: process.env.RESPONSE_LOG_LEVEL,
    api_port: process.env.API_PORT,
    api_version: process.env.API_VERSION,

    db_url: process.env.DATABASE_URL,
    db_host: process.env.DATABASE_HOST,
    db_port: process.env.DATABASE_PORT,
    db_user: process.env.DATABASE_USER,
    db_pwd: process.env.DATABASE_PSWD,
    db_name: process.env.DATABASE_NAME,
    db_dialect: process.env.DATABASE_DIALECT,
    db_logging: process.env.DATABASE_LOGGING,
    jwt_secret: process.env.JWT_SECRET,
    jwt_expired: process.env.JWT_EXPIRE,
}

export default environment
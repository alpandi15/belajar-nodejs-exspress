import project from './project.config'

module.exports = {
 development: {
   username: project.db_user,
   password: project.db_pwd,
   database: project.db_name,
   host: project.db_host,
   port: project.db_port,
   dialect: project.db_dialect,
   dialectOptions: {
     bigNumberStrings: true
   },
   define: {
     charset: 'utf8mb4',
     collate: 'utf8mb4_general_ci',
     timestamps: true
   },
   logging: false
 },
 test: {
   username: process.env.CI_DB_USERNAME,
   password: process.env.CI_DB_PASSWORD,
   database: process.env.CI_DB_NAME,
   host: '127.0.0.1',
   port: 3306,
   dialect: 'mysql',
   dialectOptions: {
     bigNumberStrings: true
   }
 },
 production: {
   username: process.env.PROD_DB_USERNAME,
   password: process.env.PROD_DB_PASSWORD,
   database: process.env.PROD_DB_NAME,
   host: process.env.PROD_DB_HOSTNAME,
   port: process.env.PROD_DB_PORT,
   dialect: 'mysql',
 }
}

// export default sequelizeConfig
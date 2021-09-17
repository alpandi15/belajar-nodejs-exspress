import Sequelize from 'sequelize'
import projectConfig from '../../config/project.config.js'

const sequelizeConfig = new Sequelize(projectConfig?.db_name, projectConfig?.db_user, projectConfig?.db_pwd, {
    host: projectConfig?.db_host,
    port: projectConfig?.db_port,
    dialect: projectConfig?.db_dialect,
    dialectOptions: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      useUTC: false,
      decimalNumbers: true,
      multipleStatements: true
    },
    logging: JSON.parse(false)
})

export default sequelizeConfig

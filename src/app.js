import express from 'express'
import createError from 'http-errors'
import session from 'cookie-session'
import path from 'path'
import cookieParser from 'cookie-parser'
import errorHandler from 'errorhandler'
import logger from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import ip from 'ip'
import SwaggerGenerator from 'express-swagger-generator'
import customErrorHandler from '#middleware/errorHandler'
import project from '#config/project.config'
import models from '#database/models'

import routes from '#routes'

// Application
const app = express()
const expressSwagger = SwaggerGenerator(app)

if (process.env.NODE_ENV === 'development') {
  console.log('Generate Swagger Docs')
  const api_prefix = project.api_version ? `/${project.api_version}` : ''

  let options = {
    swaggerDefinition: {
      info: {
        description: 'Documentation for Node JS',
        title: 'API Documentation for Node JS',
        version: '0.0.1'
      },
      host: `${ip.address()}:${project.api_port}${api_prefix}`,
      basePath: '/',
      produces: [
        'application/json'
      ],
      schemes: ['http', 'https'],
      securityDefinitions: {
        JWT: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description: ''
        }
      }
    },
    basedir: __dirname, // app absolute path
    files: [
      './lib/swagger/**/*.js',
      './controllers/**/*.js'
    ] // Path to the API handle folder
  }
  expressSwagger(options)
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet())
app.disable('x-powered-by')
// app.use(responseLogger(project.res_log_level))

// Enable All CORS Requests
app.use(cors())

if (project.env === 'development') {
  app.use(errorHandler({ dumpExceptions: true, showStack: true }))
}

// session
const sessionOption = {
  secret: 'express-sessions-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sessionOption.cookie.secure = false // serve secure cookies
}

app.use(session(sessionOption))

// routes
routes(app)

// public data static
app.use('/public', express.static(path.join(__dirname, '/src/public')));

// custome handle error response
app.use(customErrorHandler)

// initial database
models.sequelize.sync().then(() => {
  console.log(`Database ${project.db_name} initialized.`)
}).catch((err) => console.error('An Error occured while initializing the database.', err))

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


export default app
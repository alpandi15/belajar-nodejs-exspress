import express from 'express'
import createError from 'http-errors'
import path from 'path'
import cookieParser from 'cookie-parser'
import errorHandler from 'errorhandler'
import logger from 'morgan'
import helmet from 'helmet'
import customErrorHandler from '#middleware/errorHandler'
import project from '#config/project.config'
import models from '#database/models'

import routes from '#routes'

const app = express()

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

if (project.env === 'development') {
  app.use(errorHandler({ dumpExceptions: true, showStack: true }))
}

// routes
routes(app)

app.use(customErrorHandler)

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
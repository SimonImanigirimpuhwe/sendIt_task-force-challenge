import express from 'express';
import morgan from 'morgan';
import { serve, setup } from 'swagger-ui-express';
import  swaggerDocs from 'swagger-jsdoc';
import db from './models';
import todoRoutes from './routes/todo';
import authRoutes from './routes/user';
import swaggerOptions from './utils/swagger';

const app = express();

//middlewares
app.use(express.json());
app.use(morgan('dev'));

// setup swagger
app.use('/todo-docs', serve, setup(swaggerDocs(swaggerOptions)))

//routes
app.use('/users', authRoutes);
app.use('/todos', todoRoutes)

//connect to database
db.sequelize
  .authenticate()
  .then((res) => console.log('Databse connected!'))
  .catch((err) => console.log('FATAL Database connection failed', err))

export default app;
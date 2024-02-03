const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const config = require('config');



const mongoose = require('mongoose');
const express = require('express');
const app = express();


const genreRouter = require('./route/genres')
const customersRouter = require('./route/customers')
const movieRouter = require('./route/movies')
const rentalRouter = require('./route/rentals')
const userRouter = require('./route/users')
const authRouter = require('./route/auth')


mongoose.connect('mongodb://127.0.0.1:27017/movieapp')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.log('Cannot Connect to MongoDB...', err))

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}
    


app.use(express.json());
app.use('/api/genreapp', genreRouter);
app.use('/api/customers', customersRouter);
app.use('/api/movies', movieRouter);
app.use('/api/rentals', rentalRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);



const port = process.env.PORT || 3000;

app.listen(port, () => {console.log(`listening on port ${port}...`)})
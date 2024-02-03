const mongoose = require('mongoose');
const express = require('express');
const app = express();


const genreRouter = require('./route/genres')
const customersRouter = require('./route/customers')
const movieRouter = require('./route/movies')


mongoose.connect('mongodb://127.0.0.1:27017/movieapp')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.log('Cannot Connect to MongoDB...', err))


app.use(express.json());
app.use('/api/genreapp', genreRouter);
app.use('/api/customers', customersRouter);
app.use('/api/movies', movieRouter);
const port = process.env.PORT || 3000;

app.listen(port, () => {console.log(`listening on port ${port}...`)})
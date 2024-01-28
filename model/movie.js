const { genreSchema } = require("./genre")

const Joi = require('joi');
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({

title:{
    type: String,
    trim: true,
    required: true,
    minlength: 5,
    maxlength: 255,
},
genre: {
    type: genreSchema,
    required: true,
},
numberInStock: {
    type: Number,
    required: true,
    min: 5,
    max: 255,
},
dailyRentalRate: {
    type: Number,
    required: true,
    min: 5,
    max: 255,
}

})

const Movie = mongoose.model('Movie', movieSchema);



function validateMovie(movie) {
    const schema = {
   title: Joi.string().min(5).max(255).required(),
   genreId: Joi.objectId().required(),
   numberInStock: Joi.number().min(5).max(255).required(),
   dailyRentalRate: Joi.number().min(5).max(255).required(),

    };
    return Joi.validate(movie, schema)
}

 exports.Movie = Movie
exports.validate = validateMovie
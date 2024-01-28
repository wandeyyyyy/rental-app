

const { Rental, validate} = require('../model/rental');
const {Movie} = require('../model/movie');
const {Customer} = require('../model/customer');
 

const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express');
const router = express.Router();


Fawn.init(mongoose)


router.get('/', async (req,res) =>{ 

    const rent = await Rental.find().sort({ dateOut: -1 })
    res.send (rent)
})
router.post('/', async(req,res) => {
    const {error} = validate(req.body)
      
    if(error) return res.status(400).send(error.details[0].message);


   const customer = await Customer.findById(req.body.customerId)

   if(!customer) return res.status(400).send("Customer not found")


   const movie = await Movie.findById(req.body.movieId)

   if(!movie) return res.status(400).send("Movie not found")

   let rent = new Rental({
  
  customer: {
    _id: customer._id,
    name: customer.name,
    phone: customer.phone
    },
     
movie: {
    _id: movie._id,
  title: movie.title,
  dailyRentalRate: movie.dailyRentalRate
    }
  
     })

     try{
        new Fawn.Task()
          .save('rentals', rent)
          .update('movies', { _id: movie._id }, {
            $inc: { numberInStock: -1 }
          })
          .run();
        res.send(rent);
      }
      catch(ex) {
        res.status(500).send('Something failed.');
      }

})


module.exports = router
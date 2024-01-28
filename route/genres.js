const { Genre, validate } = require("../model/genre")
const express = require('express');
const router = express.Router();
// const Joi = require('joi');









router.get('/' , async (req,res) =>{ 

    const genre = await Genre.find().sort('name')
    res.send (genre)
})
// to get a movie using id
router.get('/:id', async (req,res) => {
 let genre = await Genre.findById(req.params.id)
    if (!genre) return res.status(404).send("the genre with the id not found");
    res.send(genre)
})
 

// to create a movie
router.post('/', async(req,res) => {
    const {error} = validate(req.body)
      
    if(error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({
name: req.body.name
    })

    await genre.save()
    res.send(genre);
 
})
// to update a movie
router.put('/:id', async (req,res) => {
const {error} = validate(req.body)
      
if(error) return res.status(400).send(error.details[0].message);


  let genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name})

  if (!genre) return res.status(404).send('genre with the ID not found')
  res.send(genre)
})

// to delete a movie
router.delete('/:id', async (req, res) => {
      
   let genre = await Genre.findByIdAndDelete(req.params.id)
   
  if (!genre) return res.status(404).send('genre with the ID not found')
  res.send(genre)
})

module.exports = router
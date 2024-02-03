const { User, validate } = require("../model/user")
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');



router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user)
    })
    

// router.get('/' , async (req,res) =>{ 

//     const user = await User.find().sort('name')
//     res.send(user)
// })


// // to get a user using id
// router.get('/:id', async (req,res) => {
//  let user = await User.findById(req.params.id)
//     if (!user) return res.status(404).send("the user with the id not found");
//     res.send(user)
// })


//  for a new user
router.post('/', async(req,res) => {
    const {error} = validate(req.body)
      
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');
    // user = new User({
    // name: req.body.name,
    // email: req.body.email,
    // password: req.body.password
    // });
    user = new User(
    _.pick(req.body,[
    'name', 'email', 'password' 
    ])
    );
    const salt = await bcrypt.genSalt(10);
user.password = await bcrypt.hash(user.password, salt)

    await user.save()
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
 
})











module.exports = router
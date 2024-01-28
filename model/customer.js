const Joi = require('joi');
// const boolean = require('joi/lib/types/boolean');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
},
isGold: {
    type: Boolean,
    default: false
},
phone: {
    type: String,
    required: true,
    minlength:  10,
    maxlength: 15,
}
})

const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(customer) {
    const schema = {
      name: Joi.string().min(5).max(50).required(),
      isGold: Joi.boolean(),
      phone: Joi.string().min(10).max(15).required()
    };
    return Joi.validate(customer, schema)
}

exports.Customer = Customer
exports.validate = validateCustomer
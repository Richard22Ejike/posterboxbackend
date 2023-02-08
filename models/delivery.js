const mongoose = require("mongoose");


const deliverySchema = mongoose.Schema({
  sendername: {
    type: String,
    required: true,
    trim: true,
  },
  sendernumber: {
    type: String,
    required: true,
    trim: true,
  },
  senderaddress: {
    type: String,
    required: true,
    trim: true,
  },
  receviername: {
    type: String,
    required: true,
    trim: true,
  },
  receviernumber: {
    type: String,
    required: true,
    trim: true,
  },
 
  recevieraddress: {
    type: String,
    required: true,
  },
  deliverytimeline: {
    type: String,
    required: true,
  },
  deliveryweight: {
    type: String,
    required: true,
  },
  deliveryinstructions: {
    type: String,
    required: true,
  },
  deliveryfee: {
    type: String,
    required: true,
  },
  deliverydate: {
    type: String,
    required: true,
  },

  username:{
    type: String,
    default: "",
  },
  progress:{
    type: String,
    default: "",
  },
  usernumber:{
    type: String,
    default: "",
  },

  
  

});

const Delivery = mongoose.model("Delivery", deliverySchema);
module.exports = { Delivery, deliverySchema };
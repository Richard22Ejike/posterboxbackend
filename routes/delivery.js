const express = require("express");
const deliveryRouter = express.Router();
const auth = require("../middlewares/auth");
const { Delivery } = require("../models/delivery");

deliveryRouter.post("/api/add-delivery", async (req, res) => {
    try {
      const { 
        username, 
        deliveryfee, 
        deliveryinstructions, 
        deliveryweight, 
        deliverytimeline, 
        recevieraddress,
        receviername,
        receviernumber,
        sendername, 
        sendernumber,
        deliverydate,
        senderaddress,
        progress,
        usernumber } = req.body;
      let delivery = new Delivery({
        username, 
        deliveryfee, 
        deliveryinstructions, 
        deliveryweight, 
        deliverytimeline, 
        recevieraddress,
        receviername,
        receviernumber,
        deliverydate,
        sendername,  
        sendernumber,
        senderaddress,
        progress,
        usernumber
      });
      delivery = await delivery.save();
      res.json(delivery);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });
  deliveryRouter.post("/api/track-delivery", async (req, res) => {
    try {
      const { 
        username,
        tracking 
       } = req.body;
      let delivery = await Delivery.findById(tracking);
      delivery.username = username;
      delivery = await delivery.save();
      res.json(delivery);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  deliveryRouter.post("/api/accept-delivery/", async (req, res) => {
    try {
      const { 
        username,
        progress,
        usernumber,
        _id
       } = req.body;
      let delivery = await Delivery.findById(_id);
      delivery.username = username;
      delivery.progress = progress;
      delivery.usernumber = usernumber;
      delivery = await delivery.save();
      res.json(delivery);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  deliveryRouter.post("/api/get-products", async (req, res) => {
    try {
        const { 
            username,
           } = req.body;
      let delivery = await Delivery.findById(username);
    
      res.json(delivery);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });
  deliveryRouter.get("/api/get-delivery",  async (req, res) => {
    try {
      const deliverys = await Delivery.find({});
      res.json(deliverys);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });
  
  deliveryRouter.get("/api/products/",  async (req, res) => {
    try {
      const deliverys = await Delivery.find({ username: req.query.username });
      res.json(deliverys);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });
  deliveryRouter.get("/api/products/search/:id",  async (req, res) => {
    try {
      const delivery = await Delivery.find({
        name: { $regex: req.params.id, $options: "i" },
      });
  
      res.json(delivery);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });



  module.exports = deliveryRouter;
  
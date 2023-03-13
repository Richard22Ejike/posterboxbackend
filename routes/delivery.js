const express = require("express");
const deliveryRouter = express.Router();
const auth = require("../middlewares/auth");
const User = require("../models/user");
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
        usernumber,
      state1,
    state2,
    start,
  end } = req.body;
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
        usernumber,
        state1,
        state2,
        start,
        end
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
        _id 
       } = req.body;
       console.log(_id);
      let delivery = await Delivery.findById(_id);
   
 
      res.json(delivery);
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ error: e.message });
    }
  });

  deliveryRouter.post("/api/accept-delivery/", async (req, res) => {
    try {
      const { 
        username,
        progress,
        usernumber,
        _id,
        userId,
       } = req.body;
      let delivery = await Delivery.findById(_id);
      let user = await User.findById(userId);
      if(delivery.username == '' && user.ongoing == ''){
        delivery.username = username;
        delivery.progress = progress;
        delivery.usernumber = usernumber;
        delivery = await delivery.save();
        res.json(delivery);
      }
      else{
        return res
        .status(400)
        .json({ msg: `delivery request has been taken` });
      }
      
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
  deliveryRouter.get("/api/delivery/search/:id",  async (req, res) => {
    try {
      const delivery = await Delivery.find({
        name: { $regex: req.params.id, $options: "i" },
      });
  
      res.json(delivery);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  deliveryRouter.post("/api/find-deliver",  async (req, res) => {
    
  
    try {
     
      const { id,start,end,state1,state2} = req.body;
      const startObj = { value: start };
      const endObj = { value: end };

  
    // Find users with schedules that fall within the provided range
    const users = await User.find({ "schedule.date": { 
      $gte: startObj.value,
      $lte: endObj.value 
    },
    $or: [
      { "schedule.to": state1, "schedule.from": state2 },
      { "schedule.to": state2, "schedule.from": state1 },
    ] });
     
    // Add the message to each user's notification list
    const promises = users.map(user => {
      user.notification.push({ id });
      return user.save();
    });

    // Wait for all user documents to be saved
    await Promise.all(promises);
 
    res.json(users);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  deliveryRouter.post("/api/change-order-status",  async (req, res) => {
    try {
      const { id, progress } = req.body;
      let delivery= await Delivery.findById(id);
      delivery.progress = progress;
      delivery = await delivery.save();
      res.json(delivery);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });


  module.exports = deliveryRouter;
  
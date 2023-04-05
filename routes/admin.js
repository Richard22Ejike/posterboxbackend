const express = require("express");
const adminRouter = express.Router();
const User = require("../models/user");
const admin = require("../middlewares/admin");
const { Delivery } = require("../models/delivery");

// Add product
adminRouter.post("/admin/add-product", admin, async (req, res) => {
  try {
  
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});



// Get all your products
adminRouter.get("/admin/users", admin, async (req, res) => {
    try {
        const users = await User.find({ verified: "" }).select("-password");
        res.json(users);
      } catch (e) {
        res.status(500).json({ error: e.message });
      }
});

// Delete the product
adminRouter.post("/admin/delete-product", admin, async (req, res) => {
  try {
  
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

adminRouter.get("/admin/get-deliveries", admin, async (req, res) => {
    try {
        const deliveries= await Delivery.find();
    
        const productsWithStats = await Promise.all(
            deliveries.map(async (product) => {
            const stat = await ProductStat.find({
              productId: product._id,
            });
            return {
              ...product._doc,
              stat,
            };
          })
        );
    
        res.status(200).json(productsWithStats);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
});

adminRouter.post("/admin/get-deliveries", admin, async (req, res) => {
    try {
        // sort should look like this: { "field": "userId", "sort": "desc"}
        const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;
    
        // formatted sort should look like { userId: -1 }
        const generateSort = () => {
          const sortParsed = JSON.parse(sort);
          const sortFormatted = {
            [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
          };
    
          return sortFormatted;
        };
        const sortFormatted = Boolean(sort) ? generateSort() : {};
    
        const deliveries = await Delivery.find({
          $or: [
            { deliveryfee: { $regex: new RegExp(search, "i") } },
            { userId: { $regex: new RegExp(search, "i") } },
          ],
        })
          .sort(sortFormatted)
          .skip(page * pageSize)
          .limit(pageSize);
    
        const total = await deliveries.countDocuments({
          name: { $regex: search, $options: "i" },
        });
    
        res.status(200).json({
          transactions,
          total,
        });
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
});

adminRouter.get("/admin/analytics", admin, async (req, res) => {
  try {
 
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});



module.exports = adminRouter;
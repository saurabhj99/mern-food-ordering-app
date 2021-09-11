const mongoose = require("mongoose")
const foodItemSchema = new mongoose.Schema({
  name: String,
  image: String,
  price: String,
  restaurant_name: String,
  category: {
    type: String,
    enum: ["NORTH INDIAN", "SOUTH INDIAN", "CHINESE", "DESSERTS", "FAST FOOD"],
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now() },
})

module.exports = mongoose.model("FoodItem", foodItemSchema)

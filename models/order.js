const mongoose = require("mongoose")
const orderSchema = new mongoose.Schema({
  items: [
    {
      _id: false,
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FoodItem",
      },
      image: String,
      quantity: Number,
      price: String,
      name: String,
    },
  ],
  // items: [{id:{ type: mongoose.Schema.Types.ObjectId, ref: "FoodItem" },quantity:String}],
  totalAmount: String,
  orderedAt: { type: Date, default: Date.now },

  address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },

  transaction: { type: mongoose.Schema.Types.ObjectId, ref: "Transaction" },
})

module.exports = mongoose.model("Order", orderSchema)

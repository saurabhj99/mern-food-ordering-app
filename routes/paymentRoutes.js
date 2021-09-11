const express = require("express")
const router = express.Router()
const Order = require("../models/order")
const Transaction = require("../models/transaction")
const uuid = require("uuid")
const { isAuthenticated } = require("../middleware")

const amount = (array) => {
  var totalAmount = 0
  array.forEach(({ price, quantity }) => {
    totalAmount = totalAmount + price * quantity
  })
  return totalAmount
}

router.post("/payment", isAuthenticated, async (req, res) => {
  const { full_name, cnum, items } = req.body
  const itemArray = JSON.parse(JSON.stringify(items))
  const totalAmount = amount(itemArray)
  const newTransaction = {
    transac_id: uuid.v4(),
    card_holder_name: full_name,
    card_num: cnum,
    amount: totalAmount,
  }
  const currentAddressId = req.currentUser.active_address
  if (full_name && cnum && items.length) {
    try {
      const transaction = await Transaction.create(newTransaction)
      const newOrder = await Order.create({
        transaction: transaction._id,
        items: itemArray,
        address: currentAddressId,
        totalAmount: totalAmount,
      })
      req.currentUser.orders.push(newOrder._id)
      await req.currentUser.save()
      const populatedOrder = await Order.findById(newOrder._id)
        .populate("address")
        .populate("transaction")
        .then((result) => result)
      res.status(200).json({ message: "Success", order: populatedOrder })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Payment Unsuccessfull" })
    }
  } else {
    res.status(400).json({ message: "Please fill in the fields" })
  }
})

module.exports = router

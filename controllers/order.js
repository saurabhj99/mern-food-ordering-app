const User = require("../models/user")

const orderController = async (req, res) => {
  const { _id } = req.currentUser
  try {
    const user = await User.findById(_id).populate("orders")
    if (user.orders) {
      res.status(200).json({ message: "success", orders:user.orders })
    } else {
      res.status(400).json({ message: "error" })
    }
  } catch {
    res.status(400).json({ message: "error" })
  }
}

module.exports = orderController

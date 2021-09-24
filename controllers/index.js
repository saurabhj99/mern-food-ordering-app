const loginController = require("./login")
const signUpController = require("./signup")
const productController = require("./product")
const orderController = require("./order")
const paymentController = require("./payment")

module.exports = {
  loginController,
  signUpController,
  orderController,
  paymentController,
  ...productController,
}

const loginController = require("./login")
const signUpController = require("./signup")
const productController = require("./product")
const orderController = require("./order")

module.exports = {
  loginController,
  signUpController,
  orderController,
  ...productController,
}

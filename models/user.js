const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  role: { type: String, enum: ["Customer", "Partner"] },
  phone_num: String,
  active_address: String,
  addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }],
  tokens: [{ token: { type: String, required: true } }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
})

//Hashing the password and saving it
userSchema.methods.hashPassword = async function (plainPassword) {
  const hashpassword = await bcrypt.hash(plainPassword, 10)
  this.password = hashpassword
  await this.save()
}

//Checking the entered password on login
userSchema.methods.checkPassword = async function (plainPassword) {
  const hashPassword = this.password
  const result = await bcrypt.compare(plainPassword, hashPassword)
  if (result == true) {
    return true
  } else {
    return false
  }
}

//Resets the user password
userSchema.methods.resetPassword = async function (plainPassword) {
  this.hashPassword(plainPassword)
}
//Generates Authorization Token
userSchema.methods.generateAuthToken = async function () {
  let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY)
  this.tokens = this.tokens.concat({ token: token })
  await this.save()
  return token
}

module.exports = mongoose.model("User", userSchema)

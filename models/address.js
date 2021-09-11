const mongoose = require("mongoose")
const addressSchema = new mongoose.Schema({
  full_name: String,
  address: String,
  user_id:String,
  contact_num: String,
  region: String,
  zip_code: String,
})
module.exports = mongoose.model("Address", addressSchema)

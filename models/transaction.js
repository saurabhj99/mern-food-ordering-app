const mongoose = require("mongoose")
const transactionSchema = mongoose.Schema({
  card_holder_name: String,
  card_num: String,
  transac_id: String,
  amount: String,
})

module.exports = mongoose.model("Transaction", transactionSchema)

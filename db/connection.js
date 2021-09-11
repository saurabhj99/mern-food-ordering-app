const mongoose = require("mongoose")
const databaseConnection = (DATABASEURL) => {
  mongoose.connect(
    DATABASEURL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, success) => {
      if (err) {
        console.log(err)
      } else {
        console.log("Database connected")
      }
    }
  )
}

module.exports = databaseConnection

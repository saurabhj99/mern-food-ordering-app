require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const path = require("path")
const {
  addressRoutes,
  authRoutes,
  orderRoutes,
  paymentRoutes,
  productRoutes,
} = require("./routes")

const databaseConnection = require("./db/connection")
const Ip = process.env.IP || "0.0.0.0"
const Port = process.env.PORT || 6000
const DATABASE_URL =
  process.env.DATABASEURL || "mongodb://localhost:27017/food_order_app"

app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.json())
databaseConnection(DATABASE_URL)
mongoose.set("useCreateIndex", true)
mongoose.set("useFindAndModify", false)

app.use(authRoutes)
app.use(productRoutes)
app.use(orderRoutes)
app.use(addressRoutes)
app.use(paymentRoutes)

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}

app.listen(Port, Ip, () => {
  console.log(`#### Server has started on Port ${Port} ####`)
})

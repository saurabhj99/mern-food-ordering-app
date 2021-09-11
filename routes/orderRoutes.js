const express = require("express")
const router = express.Router()
const { isAuthenticated } = require("../middleware")
const { orderController } = require("../controllers")

router.post("/orders", isAuthenticated, orderController)

module.exports = router

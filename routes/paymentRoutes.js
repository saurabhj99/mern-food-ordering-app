const express = require("express")
const router = express.Router()
const { isAuthenticated } = require("../middleware")
const { paymentController } = require("../controllers")

router.post("/payment", isAuthenticated, paymentController)

module.exports = router

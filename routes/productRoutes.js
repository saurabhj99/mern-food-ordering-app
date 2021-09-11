const express = require("express")
const router = express.Router()
const { isAuthenticated } = require("../middleware")
const {
  createProducts,
  getProductsByCategory,
  getProductById,
  getPartnerProducts,
  deleteProductById,
  updateProductbyId,
} = require("../controllers")

router.get("/products", isAuthenticated, getProductsByCategory)

router.get("/partner/products", isAuthenticated, getPartnerProducts)

router.get("/product/:id", isAuthenticated, getProductById)

router.post("/product/add", isAuthenticated, createProducts)

router.put("/product/edit/:id", isAuthenticated, updateProductbyId)

router.delete("/product/:id", isAuthenticated, deleteProductById)

module.exports = router

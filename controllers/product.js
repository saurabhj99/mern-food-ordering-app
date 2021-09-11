const FoodItems = require("../models/foodItem")

const productController = {
  getProductsByCategory: async (req, res) => {
    const { category } = req.query
    try {
      if (category) {
        const foodItems = await FoodItems.find({ category })
        if (foodItems) {
          res.json({ response: foodItems })
        }
      } else {
        new Error("Please Provide Category")
      }
    } catch {
      res.status(422).json({ message: "Error" })
    }
  },

  getPartnerProducts: async (req, res) => {
    try {
      const foodItems = await FoodItems.find({ author: req.currentUser._id })
      if (foodItems.length) {
        res.status(200).json({ response: foodItems })
      } else {
        res.status(204).json({ message: "Error" })
      }
    } catch {
      res.status(500).json({ message: "Error" })
    }
  },

  getProductById: async (req, res) => {
    const { id } = req.params
    try {
      const foundItem = await FoodItems.findById(id)
      if (foundItem) {
        res.status(200).json(foundItem)
      }
    } catch {
      res.status(204).json({ message: "Error" })
    }
  },

  createProducts: async (req, res) => {
    const { name, image, price, category } = req.body
    try {
      if (name && image && price && category) {
        const { name: currentUsername, _id } = req.currentUser
        const createdFoodItems = FoodItems.create({
          name,
          image,
          price,
          category,
          restaurant_name: currentUsername,
          author: _id,
        })
        if (createdFoodItems) {
          res.status(200).json({ message: "Items added" })
        } else {
          new Error("Please provide given fields")
        }
      }
    } catch {
      res.status(404).json({ message: "Error" })
    }
  },

  deleteProductById: async (req, res) => {
    const { id } = req.params
    try {
      await FoodItems.findByIdAndDelete(id)
      res.status(202).json({ message: "Product Deleted SuccessFully" })
    } catch {
      res.status(204).json({ message: "Error" })
    }
  },

  updateProductbyId: async (req, res) => {
    const { name, price, image, category } = req.body
    const { id } = req.params
    try {
      if (name && image && category) {
        await FoodItems.findByIdAndUpdate(id, {
          name,
          price,
          image,
          category,
        })
        res.status(202).json({ message: "Product Updated SuccessFully" })
      } else {
        new Error("Please provide given fields")
      }
    } catch {
      res.status(204).json({ message: "Error" })
    }
  },
}

module.exports = productController

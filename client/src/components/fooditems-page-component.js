import { useState, useEffect } from "react"
import axios from "axios"
import FoodItem from "./fooditem-component"
import getLocalStorage from "../utils/getData"
import Loading from "./loading-component"
import "./styles/fooditems-component.css"

const CATEGORIES = [
  "FAST FOOD",
  "NORTH INDIAN",
  "SOUTH INDIAN",
  "CHINESE",
  "DESSERTS",
]
function Categories({ category: currentCategory, setCategory }) {
  const categoryStyle = (category) => {
    const style = {
      padding: "10px",
      backgroundColor: `${
        category === currentCategory ? "#e0e0e0" : "dodgerBlue"
      }`,
      color: `${category === currentCategory ? "black" : "white"}`,
      cursor: "pointer",
    }
    return style
  }
  return (
    <div className="bootstrap">
      <div className="categories">
        <h5>Categories:</h5>
        {CATEGORIES.map((category) => (
          <span
            key={category}
            name={category}
            className={`badge badge-pill`}
            style={categoryStyle(category)}
            onClick={(e) => setCategory(e.target.textContent)}
          >
            {category}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function FoodItemPage({ cartItems, setCartItems }) {
  const [itemCount, setItemCount] = useState(0)
  const [foodItems, setFoodItems] = useState([])
  const [addedItems, setAddedItems] = useState([])
  const [category, setCategory] = useState(CATEGORIES[0])
  const [action, setAction] = useState("none")
  const [fetchStatus, setFetchStatus] = useState()
  const getFoodItems = async (category) => {
    try {
      setFetchStatus("loading")
      const res = await axios.get(
        `/products`,
        { params: { category } },
        { crossdomain: true }
      )
      if (res.status === 200) {
        const foodItems = await JSON.parse(JSON.stringify(res.data.response))
        setFoodItems(foodItems)
        setFetchStatus("sucesss")
      } else {
        throw Error("Server error")
      }
    } catch (error) {
      // console.log("error")
    }
  }

  useEffect(() => {
    (async () => {
      getLocalStorage(setCartItems)
      await getFoodItems(category)
    })()
  }, [category])

  useEffect(() => {
    saveLocalStorage()
    setAddedItems(cartItems.map((item) => item.id))
  }, [cartItems, setAddedItems])

  const cartItemHandler = async (event) => {
    const id = event.target.dataset.id
    const itemAdded = addedItems.includes(id)
    if (itemAdded) {
      deleteFromCart(id)
      setAddedItems(cartItems.filter((item) => item.id !== id))
      setItemCount(itemCount - 1)
      setAction("delete")
    } else {
      addToCart(id)
      setAddedItems([...addedItems, id])
      setItemCount(itemCount + 1)
      setAction("add")
    }
  }

  const addToCart = (id) => {
    axios
      .get(`/product/${id}`)
      .then((res) => {
        const { _id, image, price, name } = res.data
        setCartItems([
          ...cartItems,
          {
            id: _id,
            image: image,
            price: Number(price),
            name: name,
            quantity: 1,
          },
        ])
      })
      .catch((err) => {
        // console.log(err)
      })
  }
  const saveLocalStorage = () => {
    if (action === "add" || action === "delete") {
      localStorage.setItem("cartitems", JSON.stringify(cartItems))
    }
  }

  const deleteFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  return (
    <>
      <Categories category={category} setCategory={setCategory} />
      {!foodItems.length || fetchStatus === "loading" ? (
        <Loading />
      ) : (
        <FoodItem
          foodItems={foodItems}
          addedItems={addedItems}
          cartItemHandler={cartItemHandler}
        />
      )}
    </>
  )
}

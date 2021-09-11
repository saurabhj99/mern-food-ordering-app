import axios from "axios"
import { useEffect, useState } from "react"
import { useHistory, Link } from "react-router-dom"
import Product from "./product-component"
export default function ProductList() {
  const [foodItems, setFoodItems] = useState([])
  const [fetchStatus, setFetchStatus] = useState("loading")
  const history = useHistory()
  useEffect(() => {
    (async () => await getFoodItems())()
  }, [])

  const getFoodItems = async () => {
    try {
      const res = await axios.get("/partner/products", { crossdomain: true })
      if (res.status === 200) {
        const fooditems = await JSON.parse(JSON.stringify(res.data.response))
        setFetchStatus("success")
        setFoodItems(fooditems)
      }
      if (res.status === 204) {
        setFetchStatus("failure")
      }
    } catch (error) {
      history.push("/partner/login")
    }
  }

  return <Product foodItems={foodItems} fetchStatus={fetchStatus} />
}

import React, { useEffect, useState } from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"
import "./styles/address-form-component.css"
const CATEGORIES = [
  "NORTH INDIAN",
  "SOUTH INDIAN",
  "CHINESE",
  "DESSERTS",
  "FAST FOOD",
]

const UpdateFoodItems = (props) => {
  const history = useHistory()
  const { id } = props.match.params
  const [input, setInput] = useState({
    name: "",
    image: "",
    price: "",
    category: "",
  })
  const [message,setMessage]=useState({ text: "", type: "" });
  const { name, image, price, category } = input

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    axios
      .get(`/product/${id}`, input)
      .then((res) => {
        const { name, image, price, category } = res.data
        setInput({ name, image, price, category })
      })
      .catch((err) => {
        // console.log(err)
      })
  }
  const submitHandler = (e) => {
    e.preventDefault()
    if (name && image && price && category) {
      axios
        .put(`/product/edit/${id}`, input)
        .then((res) => {
          history.push("/product/list")
        })
        .catch((err) => {
          // console.log(err)
        })
    } else {
      setMessage({
        text: "Please Fill in the fields",
        type: "error",
      })
    }
  }
  return (
    <>
     <div className={`flash-message ${message.type}`}>{message.text}</div>
      <form onSubmit={submitHandler} className="cstm-frm1" method="POST">
        <h1 className="centered">UPDATE FOOD ITEM</h1>
        <label htmlFor="name"> Name</label>
        <input
          id="name"
          value={name}
          onChange={changeHandler}
          type="text"
          name="name"
        />

        <label htmlFor="price">Price</label>
        <input
          id="price"
          value={price}
          onChange={changeHandler}
          type="text"
          name="price"
        />

        <label htmlFor="image">Image</label>
        <input
          id="image"
          value={image}
          onChange={changeHandler}
          type="text"
          name="image"
        />
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={changeHandler}
          name="category"
        >
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <input
          type="submit"
          className="cstm-button1 btn-sm"
          value="UPDATE ITEM"
        />
      </form>
    </>
  )
}

export default UpdateFoodItems

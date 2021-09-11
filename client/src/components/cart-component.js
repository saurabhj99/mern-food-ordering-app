import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import "./styles/cart-component.css"
import CartItems from "./cartitems-component"
import getLocalStorage from "../utils/getData"

export default function Cart({
  itemCount,
  cartItems,
  setItemCount,
  setCartItems,
}) {
  const [itemTotal, setItemTotal] = useState(0)
  const history = useHistory()
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn")) {
      getLocalStorage(setCartItems)
    } else {
      history.push("/")
    }
  }, [])

  useEffect(() => {
    saveLocalStorage()
    setItemTotal((prev) => {
      prev = 0
      cartItems.forEach((item) => {
        var sum = parseInt(item.price) * item.quantity
        prev += sum
      })
      return prev
    })
  }, [cartItems])

  const onClickHandler = () => {
    history.push("/food")
  }

  const setQuantity = (e) => {
    const { id, action } = e.target.dataset
    const newArray = [...cartItems]
    const elementindex = newArray.findIndex((el) => el.id === id)
    const currentQuantity = newArray[elementindex].quantity
    switch (action) {
      case "add":
        if (currentQuantity < 10) {
          newArray[elementindex] = {
            ...newArray[elementindex],
            quantity: currentQuantity + 1,
          }
          setCartItems(newArray)
        }
        break
      case "remove":
        if (currentQuantity > 1) {
          newArray[elementindex] = {
            ...newArray[elementindex],
            quantity: currentQuantity - 1,
          }
          setCartItems(newArray)
        }
        break
      default:
        break
    }
  }

  const deleteItem = (e) => {
    const id = e.target.dataset.id
    setCartItems(cartItems.filter((item) => item.id !== id))
    setItemCount(itemCount - 1)
  }
  const saveLocalStorage = () => {
    if (localStorage.getItem("cartitems") !== null) {
      localStorage.setItem("cartitems", JSON.stringify(cartItems))
    }
  }

  if (cartItems.length < 1) {
    return (
      <div className="no-item">
        <h1>OOPS!! Looks like there are no items in your cart</h1>
        <button onClick={onClickHandler} className="cart-btn w-30 m-30">
          Start Ordering
        </button>
      </div>
    )
  } else {
    return (
      <div className="main-container">
        <div className="cart-item-container">
          <div>
            <h2 className="cart-header">My Cart</h2>
            <hr className="custom-hr" />
          </div>
          {cartItems.map((item, i) => (
            <div key={item.id} className="cart-item">
              <div className="cart-image">
                <img src={item.image} alt={`food-${i}`} />
              </div>
              <div className="item-info">
                <h3>{item.name}</h3>
                <div className="item-price">
                  <strong>
                    ₹ {item.price} X {item.quantity}
                  </strong>
                  <div className="counter">
                    <button
                      data-id={item.id}
                      data-action="remove"
                      onClick={setQuantity}
                    >
                      -
                    </button>
                    <div id={item.id}>{item.quantity}</div>
                    <button
                      data-id={item.id}
                      data-action="add"
                      onClick={setQuantity}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="cart-btn"
                  onClick={deleteItem}
                  data-id={item.id}
                >
                  Remove
                </button>
              </div>
              <div className="item-delivery">
                <i className="far fa-clock"></i> Delivered in 45 mins
              </div>
            </div>
          ))}
        </div>
        <CartItems itemCount={itemCount} itemTotal={itemTotal} />
      </div>
    )
  }
}

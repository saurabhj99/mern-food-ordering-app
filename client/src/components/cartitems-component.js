import "./styles/cartitems-component.css"
import { useHistory } from "react-router-dom"

export default function CartItems({ itemCount, itemTotal }) {
  const history = useHistory()
  const onClickHandler = () => {
    history.push("/address")
  }
  return (
    <div className="food-cart-container">
      <div>
        <h3>
        <i className="fas fa-shopping-cart"></i> Your Items
        </h3>
      </div>
      <div>
        <div>
          Price (<span>{itemCount ? itemCount : ""} items</span>)
        </div>
        <div>
          <span><strong>₹</strong> {itemTotal ? itemTotal : ""}</span>
        </div>
      </div>
      <div className="delivery-header">
        <div>Delivery Charges</div>
        <div>Free</div>
      </div>
      <hr className="custom-hr"/>
      <div>
        <div><strong>Total Amount</strong></div>
        <div><strong>₹</strong> {itemTotal ? itemTotal : ""}</div>
      </div>
      <button className="cstm-button1" onClick={onClickHandler}>
        Place Order
      </button>
    </div>
  )
}

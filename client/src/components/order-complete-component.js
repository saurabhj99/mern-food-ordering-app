import "./styles/order-complete-component.css"

export default function OrderSuccess({ orderDetails }) {
  const { _id, address: addressObj, transaction, items } = orderDetails
  const { full_name, address, contact_num, region, zip_code } = addressObj
  const { transac_id, card_num, amount } = transaction
  return (
    <div className="order-details-container">
      <div className="order-head">
        <div className="success_img_container">
          <img className="success_img" src="/assets/images/success_tick.png" />
        </div>
        <div>
          <h1>Order Successfull</h1>
        </div>
      </div>
      <div>
        <strong>Order Id: # {_id.toUpperCase()} </strong>
      </div>
      <div>
        <strong>Address:</strong>
        <strong>{full_name}</strong>
        <div>{`${address},${region} - ${zip_code}`}</div>
      </div>
      <div>
        <strong>Contact:</strong>
        <div>{contact_num}</div>
      </div>
      <div>
        <strong>Your Items:</strong>
        <div className="bootstrap">
          <table className="table table-striped">
            <tbody>
              {items.map(({ id, name, image, price, quantity }) => (
                <tr key={id}>
                  <td>
                    <img width="70px" height="50px" src={image} />
                  </td>
                  <td>{name}</td>
                  <td>{`₹ ${price} X ${quantity}`}</td>
                  <td>₹ {Number(price) * Number(quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <div>
          Payment from card ending{" "}
          <strong>
            {card_num.slice(card_num.length - 4, card_num.length)}
          </strong>
        </div>
      </div>
      <div>
        <strong>Transaction Id: # {transac_id}</strong>
      </div>
      <div>
        <strong>Total Amount:</strong>
        <div>
          <strong>₹ </strong>
          {amount}
        </div>
      </div>
    </div>
  )
}

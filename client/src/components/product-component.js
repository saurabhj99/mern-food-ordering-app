import axios from "axios"
import { Link } from "react-router-dom"
import { formatDate } from "../utils/dateHelper"
import Loading from "./loading-component"

export default function Product({ foodItems, fetchStatus }) {
  const onClickHandler = async (e) => {
    const { id } = e.target.dataset
    const url = `/product/${id}`
    try {
      const res = await axios.delete(url)
      if (res.status === 202) {
        window.location.reload()
      }
    } catch (err) {
      // console.log(err)
    }
  }

  return fetchStatus === "success" ? (
    <div className="bootstrap">
      <div className="container mt-4">
        <h3 className="text-center">Published Products</h3>
        <table className="table table-striped mt-4">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Price</th>
              <th>Date Created</th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>
            {foodItems.map(({ _id, image, name, price, date }, i) => (
              <tr key={i}>
                <td>
                  <img
                    width="80"
                    height="70"
                    src={image}
                    alt={`food-item-${i}`}
                  />
                </td>
                <td>{name}</td>
                <td>Rs {price}</td>
                <td>{formatDate(date)}</td>
                <td>
                  <Link to={`/product/edit/${_id}`} className="btn btn-primary">
                    Update
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    data-id={_id}
                    onClick={onClickHandler}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="centered">
          <Link to="/product/add" className="btn btn-primary mt-4">
            + ADD NEW ITEMS
          </Link>
        </div>
      </div>
    </div>
  ) : fetchStatus === "loading" ? (
    <Loading message={"Loading Items.."} />
  ) : (
    <div className="bootstrap">
      <div className="container w-25 centered mt-4">
        <h3>No items added</h3>
        <Link to="/product/add" className="btn btn-primary mt-4">
          + ADD NEW ITEM
        </Link>
      </div>
    </div>
  )
}

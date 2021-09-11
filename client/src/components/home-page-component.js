import { useEffect } from "react"
import Footer from "./footer-component"
import { useHistory } from "react-router-dom"
import "./styles/home-page-component.css"
import getLocalStorage from "../utils/getData"

export default function Homepage({ isLoggedIn, setCartItems }) {
  const history = useHistory()
  useEffect(() => {
    getLocalStorage(setCartItems)
  }, [])
  const onClickHandler = () => {
    if (isLoggedIn) {
      history.push("/food")
    } else {
      history.push("/login")
    }
  }
  return (
    <>
      <div className="item-container">
        <div className="item-1">
          <img src="/assets/images/image1.jpg" alt="image1" />
          <div>
            <p className="text-lg">Too tired to cook food today?</p>
            <p className="text-lg text-bg-red">Welcome to Foodiezone</p>
            <p className="text-desc">
              Choose from a range of restaurants available nearby ,Freshly
              prepared hygienic food delivered at our doorstep
            </p>
            <button onClick={onClickHandler} className="btn-red">
              START ORDERING
            </button>
          </div>
        </div>

        <div className="item-2">
          <div>
            <p className="text-lg text-bg-dark">
              Serving In Various Locations{" "}
            </p>
            <p className="text-desc">
              Now serving in more than{" "}
              <span className="text-bg-red">Thousands of locations</span>.
              Select restaurants available nearby,according to your choice and
              get your food delivered at your doorstep without any hassle
            </p>
          </div>
          <img src="/assets/images/location.png" alt="image2" />
        </div>

        <div className="item-3">
          <img src="/assets/images/feature13.jpg" alt="image3" />
          <div>
            <p className="text-lg text-bg-red">Various Cuisines </p>
            <p className="text-desc">
              Choose your favourite cuisine items{" "}
              <span className="text-bg-red">
                North Indian,South Indian,Western
              </span>
              . Select favourite cuisines items and deserts of your choice from
              a range of restaurants,cafes joined with us serving you quality
              food.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

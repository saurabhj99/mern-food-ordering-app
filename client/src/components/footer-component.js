import { Link } from "react-router-dom"
import "./styles/footer-component.css"
export default function Footer() {
  return (
    <div className="footer">
      <div>
        <h1>FoodieZone <i className="fas fa-utensils"></i></h1>
      </div>
      <div>
        <strong>For Partners</strong>
        <div>
          <Link className="link" to="partner/register">Signup</Link>
        </div>
        <div>
          <Link className="link" to="partner/login">Login</Link>
        </div>
      </div>
      <div>
        <strong>For You</strong>
        <div>Privacy</div>
        <div>Terms</div>
        <div>Secuirity</div>
      </div>
      <div></div>
    </div>
  )
}

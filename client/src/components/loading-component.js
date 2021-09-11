import Spinner from "./spinner-component"
import './styles/loading-component.css'
const DEFAULT_MESSAGE = "LOADING....."

const Loading = ({ message }) => {
  return (
    <div className="loading-container">
      <div className=" loading centered mt-4">
        <Spinner />
        <h1>{message ? message : DEFAULT_MESSAGE}</h1>
      </div>
    </div>
  )
}

export default Loading

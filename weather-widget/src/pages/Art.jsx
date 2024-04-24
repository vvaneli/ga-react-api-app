import { Link } from "react-router-dom"
import { artObj } from '../components/ArtObj.jsx'
// import axios from 'axios'

export default function Art() {

  // WIDGET SIZE
  const widgetWidth = 349

  // IMAGES
  const imgDimension = (widgetWidth * 1.5)  // max 2500px inc. margins

  return (
    <Link to={'/info'}>
      <section id="art">
        <div className="artImg" style={{ backgroundImage: `url(https://framemark.vam.ac.uk/collections/${artObj[eventDayWeather.weather[0].icon][0].id}/full/!${imgDimension},${imgDimension}/0/default.jpg)` }}>
        </div>
      </section>
    </Link>
  )
}
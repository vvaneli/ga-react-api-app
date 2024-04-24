import { useEffect, useState } from 'react'
import { artObj } from '../components/ArtObj.jsx'
import axios from 'axios'
import { Link } from "react-router-dom"

// SVG icons
import iconEditLoc from '../icons/edit_location_FILL0_wght400_GRAD0_opsz24.svg'
import iconHelp from '../icons/help_FILL0_wght400_GRAD0_opsz24.svg'
import iconInfo from '../icons/info_FILL0_wght400_GRAD0_opsz24.svg'
import iconArt from '../icons/palette_FILL0_wght400_GRAD0_opsz24.svg'


export default function Info() {

  const [eventDayWeather, setEventDayWeather] = useState()
  const [eventCity, setEventCity] = useState()

  //! UPDATE WITH LOCAL STORAGE ITEMS
  const cnt = 10 // Number() // no. of days until event day
  const lat = 39.906217
  const lon = 116.3912757
  const eventName = 'Sister\'s wedding and funeral'
  const eventDate = new Date().getTime()

  // WIDGET SIZE
  const widgetWidth = 349

  // IMAGES
  const imgDimension = (widgetWidth * 1.5)  // max 2500px inc. margins

  // trycatch for weather api using geo data retrieved from localStorage
  useEffect(() => {
    async function getEventInfo() {
      try {
        const { data } = await axios.get(`https://pro.openweathermap.org/data/2.5/forecast/climate?lat=${lat}&lon=${lon}&cnt=${cnt}&units=metric&appid=${import.meta.env.VITE_API_KEY}`)
        setEventCity(data.city)
        setEventDayWeather(data.list[cnt - 1]) // set the last item in the .list array
        // console.log(eventCity)
        // console.log(eventDayWeather)
        // console.log(eventCity.name)  // Output: London
        // console.log(eventCity.country)  // Output: GB
        // console.log(eventDayWeather.feels_like.day)  // Output: 7.08 (temperature)
        // console.log(eventDayWeather.clouds)  // Output: 18 (cloudiness %)
        // console.log(eventDayWeather.weather[0].icon)  // Output: 10d ––– NOTE: the second index is always zero (hard code it)
        // console.log(eventDayWeather.weather[0].description)  // Output: light rain ––– NOTE: the second index is always zero (hard code it)
      } catch (error) {
        console.log(error.message)
      }
    }
    getEventInfo()
  }, [])

  return (
    <>
      {eventDayWeather ?
        (
          <>
            <section id="info">
              <div className="stickerEvent">
                <h1 className="eventName">{eventName}</h1>
                <p className="eventCity">{eventCity.name}</p>
                <p className="eventDate">{eventDate}</p>
              </div>
              <div className="artBack">
                <div className="stampForecast">
                  <div className="circle degreesNumBig"><span className="degreesNum">{(eventDayWeather.feels_like.day).toFixed(0)}</span></div>
                  <p className="owFeelsLike">{(eventDayWeather.feels_like.day).toFixed(0)}</p>
                  <p className="owDescription">{eventDayWeather.weather[0].description}</p>
                </div>
                <div className="iconBtn">
                  <Link to={'/'}>
                    <img src={iconHelp} alt="Instructions" />
                  </Link>
                  <Link to={'/create-event'}>
                    <img src={iconEditLoc} alt="Edit event and location" />
                  </Link>
                  {/* <img src={iconInfo} alt="About" /> */}
                  <Link to={'/art'}>
                    <img src={iconArt} alt="Art" />
                  </Link>
                </div>
              </div>
            </section>
            <section id="art">
              <div className="artImg" style={{ backgroundImage: `url(https://framemark.vam.ac.uk/collections/${artObj[eventDayWeather.weather[0].icon][0].id}/full/!${imgDimension},${imgDimension}/0/default.jpg)` }}>
              </div>
            </section>
            {/* <section id="credits">
              <p className=""></p>
            </section> */}
          </>
        )
        :
        <p>Waiting for the weather</p>
      }
    </>
  )
}
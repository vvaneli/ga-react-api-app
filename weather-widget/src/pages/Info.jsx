import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

// Components
import { artObj } from '../components/ArtObj.jsx'
import { dayOfWeek, month } from '../components/DateFormat.jsx'

// Images and Icons
import iconEditLoc from '../icons/edit_location_FILL0_wght400_GRAD0_opsz24.svg'
import iconHelp from '../icons/help_FILL0_wght400_GRAD0_opsz24.svg'
import iconInfo from '../icons/info_FILL0_wght400_GRAD0_opsz24.svg'
import iconArt from '../icons/palette_FILL0_wght400_GRAD0_opsz24.svg'
import back from '../icons/frame-back.jpg' // background image

export default function Info() {

  const navigate = useNavigate()

  // If local storage is empty, go to form page
  useEffect(() => {
    function checkLocalStorage() {
      if (localStorage.events === undefined) {
        navigate('/create-event')
      }
    }
    checkLocalStorage()
  }, [])


  // Widget size
  const widgetWidth = 349

  // Image size
  const imgDimension = (widgetWidth * 1.5)  // max 2500px inc. margins

  // Get from local storage
  const lat = (JSON.parse(localStorage.getItem('events'))).lat
  const lon = (JSON.parse(localStorage.getItem('events'))).lon
  const eventName = (JSON.parse(localStorage.getItem('events'))).eventName
  const eventDate = (JSON.parse(localStorage.getItem('events'))).eventDate
  const eventLocation = (JSON.parse(localStorage.getItem('events'))).eventLocation
  // 30 day forecast, valid cnt range 1 to 30
  const cnt = (Math.round((JSON.parse(localStorage.getItem('events')).eventDate - (new Date()).getTime()) / (1000 * 3600 * 24)))

  // State variables
  const [eventDayWeather, setEventDayWeather] = useState()
  // const [eventCity, setEventCity] = useState() // Showing the location from Weather API, rather than from localStorage
  const [error, setError] = useState('')

  // Get weather forecast
  useEffect(() => {
    async function getWeatherForecast() {
      try {
        const { data } = await axios.get(`https://pro.openweathermap.org/data/2.5/forecast/climate?lat=${lat}&lon=${lon}&cnt=${cnt}&units=metric&appid=${import.meta.env.VITE_API_KEY}`)
        // setEventCity(data.city.name)
        setEventDayWeather(data.list[cnt - 1]) // get the last item in the .list array
        // console.log(eventDayWeather)
        // console.log(eventCity.name)  // Output: London
        // console.log(eventCity.country)  // Output: GB
        // console.log(eventDayWeather.feels_like.day)  // Output: 7.08 (temperature)
        // console.log(eventDayWeather.clouds)  // Output: 18 (cloudiness %)
        // console.log(eventDayWeather.weather[0].icon)  // Output: 10d ––– NOTE: the second index is always zero (hard code it)
        // console.log(eventDayWeather.weather[0].description)  // Output: light rain ––– NOTE: the second index is always zero (hard code it)
      } catch (error) {
        setError(error.message)
      }
    }
    getWeatherForecast()
  }, [])

  return (
    <>
      {eventDayWeather ?
        (
          <>
            <section id='info' style={{ backgroundImage: `url(${back})` }}>
              <div className='stickerEvent'>
                <h1 className='eventName'>{eventName}</h1>
                <p className='eventCity'>{eventLocation}</p>
                <p className='eventDate'>{dayOfWeek[new Date(eventDate).getDay()]} {new Date(eventDate).getDate()} {month[new Date(eventDate).getMonth()]}</p>
              </div>
              <div className='artBack'>
                <div className='stampForecast'>
                  <div className='circle degreesNumBig'><span className='degreesNum'>{(eventDayWeather.feels_like.day).toFixed(0)}</span></div>
                  <p className='owFeelsLike'>{(eventDayWeather.feels_like.day).toFixed(0)}</p>
                  <p className='owDescription'>{eventDayWeather.weather[0].description}</p>
                </div>
                <div className='iconBtn'>
                  <Link to={'/'}>
                    <img src={iconHelp} alt='Instructions' />
                  </Link>
                  <Link to={'/create-event'}>
                    <img src={iconEditLoc} alt='Edit event and location' />
                  </Link>
                  {/* <img src={iconInfo} alt='About' /> */}
                  <Link to={'/art'}>
                    <img src={iconArt} alt='Art' />
                  </Link>
                </div>
              </div>
            </section>
            <section id='art'>
              <div className='artImg' style={{ backgroundImage: `url(https://framemark.vam.ac.uk/collections/${artObj[eventDayWeather.weather[0].icon][0].id_img}/full/!${imgDimension},${imgDimension}/0/default.jpg)` }}>
              </div>
            </section>
            {/* <section id='credits'>
                <p className=''></p>
              </section> */}
          </>
        )
        :
        (
          <div>
            <p>Waiting for the weather</p>
            <br />
            <p><small>{error}</small></p>
          </div>
        )
      }
    </>
  )

}
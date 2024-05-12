import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { artObj } from '../components/ArtObj.jsx'

export default function Art() {

  // State variables
  const [eventDayWeather, setEventDayWeather] = useState()
  const [error, setError] = useState('')

  // Static variables
  const widgetWidth = 349 // Widget size
  const imgDimension = (widgetWidth * 1.5)  // Image size, max 2500px inc. margins

  // If local storage is empty, go to homepage
  const navigate = useNavigate()
  useEffect(() => {
    function checkLocalStorage() {
      if (!localStorage.getItem('events')) { // Not localStorage.events, because it's not an object
        navigate('/')
      }
    }
    checkLocalStorage()
  }, [])

  // Get weather forecast
  useEffect(() => {
    async function getWeatherForecast() {
      try {
        // Get from local storage
        const lat = (JSON.parse(localStorage.getItem('events'))).lat
        const lon = (JSON.parse(localStorage.getItem('events'))).lon
        // For 30 day forecast, valid cnt range is 1 to 30
        const cnt = (Math.round((JSON.parse(localStorage.getItem('events')).eventDate - (new Date()).getTime()) / (1000 * 3600 * 24)))
        const { data } = await axios.get(`https://pro.openweathermap.org/data/2.5/forecast/climate?lat=${lat}&lon=${lon}&cnt=${cnt}&units=metric&appid=${import.meta.env.VITE_API_KEY}`)
        // console.log(data)
        // setEventCity(data.city.name)
        setEventDayWeather(data.list[cnt - 1]) // get the last item in the .list array
        // console.log(eventCity.name)  // Output: London
        // console.log(eventCity.country)  // Output: GB
        // console.log(eventDayWeather.clouds)  // Output: 18 (cloudiness %)
        // console.log('dt: ' + eventDayWeather.dt + ', ' + eventDayWeather.dt.toUTCString())

        // save weather data to localStorage
        localStorage.setItem('weather', JSON.stringify(data.list[cnt - 1]))
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
            <section id='art'>
              <Link to={'/art-back'}>
                <div className='artImg' style={{ backgroundImage: `url(https://framemark.vam.ac.uk/collections/${artObj[eventDayWeather.weather[0].icon][0].id_img}/full/!${imgDimension},${imgDimension}/0/default.jpg)` }}>
                </div>
              </Link>
            </section>
          </>
        )
        :
        (
          <section id="apiError">
            <p>Waiting for the Weather</p>
            {/* <hr /> */}
            <aside>
              {error &&<p><small className='errorMsg'>{error}</small></p>}
              <Link to={'/create-event'}>
              {error && <p className='errorEescapeBtn'>Edit Event</p>}
              </Link>
            </aside>
          </section>
        )
      }
    </>
  )
}
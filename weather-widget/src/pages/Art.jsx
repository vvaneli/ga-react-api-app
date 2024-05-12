import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { artObj } from '../components/ArtObj.jsx'

export default function Art() {

  // State variables
  const [eventDayWeather, setEventDayWeather] = useState()
  const [error, setError] = useState('')
  const [airQ, setAirQ] = useState()

  // Static variables
  const grad = 2 // air quality index multiplication factor for image gradient
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
    // Round up, otherwise today is counted as -1 (today's date should be day 0)
    const cnt = (Math.ceil((JSON.parse(localStorage.getItem('events')).eventDate - (new Date()).getTime()) / (1000 * 3600 * 24)))
    console.log('count: ' + cnt)
    async function getWeatherForecast() {
      try {
        // Get from local storage
        const lat = (JSON.parse(localStorage.getItem('events'))).lat
        const lon = (JSON.parse(localStorage.getItem('events'))).lon
        
        // API: current weather (day zero)
        if (cnt < 1){
          console.log('today: ' + lat)
          const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_API_KEY}`)
          // setEventDayWeather(data.list)
          console.log('data: ' + data)
          localStorage.setItem('weather', JSON.stringify(data))
        }
        // API: 16 day forecast (day 1 to 16)
        if ((cnt > 0 ) && (cnt < 17)) {
          console.log('16: ' + lat)
          const { data } = await axios.get(`https:api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=${cnt}&units=metric&appid=${import.meta.env.VITE_API_KEY}`)
          setEventDayWeather(data.list[cnt - 1]) // get the last item in the .list array
          localStorage.setItem('weather', JSON.stringify(data.list[cnt - 1]))
        }
        // API: 30 day climate forecast (day 17 to 30)
        if (cnt > 16) {
          console.log('30: ' + lat)
          const { data } = await axios.get(`https://pro.openweathermap.org/data/2.5/forecast/climate?lat=${lat}&lon=${lon}&cnt=${cnt}&units=metric&appid=${import.meta.env.VITE_API_KEY}`)
          setEventDayWeather(data.list[cnt - 1]) // get the last item in the .list array
          localStorage.setItem('weather', JSON.stringify(data.list[cnt - 1]))
        }
        const air = await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_API_KEY}`)
        setAirQ(((air.data.list[0].main.aqi) - 1) * grad)
        // setEventCity(data.city.name)
        // console.log(eventCity.name)  // Output: London
        // console.log(eventCity.country)  // Output: GB
        // console.log(eventDayWeather.clouds)  // Output: 18 (cloudiness %)
        // console.log('dt: ' + eventDayWeather.dt + ', ' + eventDayWeather.dt.toUTCString())

        // save weather data to localStorage
        // localStorage.setItem('weather', JSON.stringify(data.list[cnt - 1]))
        localStorage.setItem('airQuality', (air.data.list[0].main.aqi))
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
                <div className='artImg' style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.${airQ}), rgba(0, 0, 0, 0.${airQ})), url(https://framemark.vam.ac.uk/collections/${artObj[eventDayWeather.weather[0].icon][0].id_img}/full/!${imgDimension},${imgDimension}/0/default.jpg)` }}>
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
              {error && <p><small className='errorMsg'>{error}</small></p>}
              <Link to={'/create-event'}>
                {error && <p className='errorEscapeBtn'>Edit Event</p>}
              </Link>
            </aside>
          </section>
        )
      }
    </>
  )
}
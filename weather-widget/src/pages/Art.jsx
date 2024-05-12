import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { artObj } from '../components/ArtObj.jsx'

import { oldArt } from '../components/NoArt.jsx'

export default function Art() {

  // State variables
  const [eventDayWeather, setEventDayWeather] = useState()
  const [airQ, setAirQ] = useState(0)
  const [error, setError] = useState('')

  // Static variables
  const grad = 2 // air quality index multiplication factor for image gradient
  const widgetWidth = 349 // Widget size
  const imgDimension = (widgetWidth * 1.5)  // Image size, max 2500px inc. margins

  const navigate = useNavigate()
  
  // If local storage is empty, go to homepage
  useEffect(() => {
    if (oldArt() === true){
      navigate('/')
    }
  }, [])

  // Get weather forecast
  useEffect(() => {
    // Round up, otherwise today is counted as -1 (today's date should be day 0)
    const cnt = (Math.ceil((JSON.parse(localStorage.getItem('events')).eventDate - (new Date()).getTime()) / (1000 * 3600 * 24)))
    // console.log('count: ' + cnt)
    async function getWeatherForecast() {
      try {
        // Get from local storage
        const lat = (JSON.parse(localStorage.getItem('events'))).lat
        const lon = (JSON.parse(localStorage.getItem('events'))).lon

        // API: current weather (day zero)
        if (cnt < 1) {
          // console.log('api today')
          const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_API_KEY}`)
          const weather = {
            city: data.name,
            country: data.sys.country,
            weatherId: data.weather[0].id,
            weatherIcon: data.weather[0].icon,
            description: data.weather[0].description,
            temperatureC: data.main.feels_like,
            cloudiness: data.clouds.all,
            rain: data.rain,
            gust: data.wind.gust,
            dt: Date(data.dt), // date weather data created
            api: 'now', // Options: now, 16day, 30day
          }
          // save weather data to localStorage and state variable
          setEventDayWeather(weather)
          localStorage.setItem('weather', JSON.stringify(weather))
        }
        // API: 16-day forecast (day 1 to 16)
        if ((cnt > 0) && (cnt < 17)) {
          // console.log('api 16')
          const { data } = await axios.get(`https:api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=${cnt}&units=metric&appid=${import.meta.env.VITE_API_KEY}`)
          const weather = {
            city: data.city.name,
            country: data.city.country,
            weatherId: data.list[cnt - 1].weather[0].id,
            weatherIcon: data.list[cnt - 1].weather[0].icon,
            description: data.list[cnt - 1].weather[0].description,
            temperatureC: data.list[cnt - 1].feels_like.day,
            cloudiness: data.list[cnt - 1].clouds,
            rain: data.list[cnt - 1].rain,
            gust: data.list[cnt - 1].gust,
            dt: Date(data.list[cnt - 1].dt),
            api: '16day',
          }
          // save weather data to localStorage and state variable
          localStorage.setItem('weather', JSON.stringify(weather))
          setEventDayWeather(weather)
        }
        // API: 30-day climate forecast (day 17 to 30)
        if (cnt > 16) {
          // console.log('api 30')
          const { data } = await axios.get(`https://pro.openweathermap.org/data/2.5/forecast/climate?lat=${lat}&lon=${lon}&cnt=${cnt}&units=metric&appid=${import.meta.env.VITE_API_KEY}`)
          const weather = {
            city: data.city.name,
            country: data.city.country,
            weatherId: data.list[cnt - 1].weather[0].id,
            weatherIcon: data.list[cnt - 1].weather[0].icon,
            description: data.list[cnt - 1].weather[0].description,
            temperatureC: data.list[cnt - 1].feels_like.day,
            cloudiness: data.list[cnt - 1].clouds,
            rain: data.list[cnt - 1].rain,
            gust: data.list[cnt - 1].gust,
            dt: Date(data.list[cnt - 1].dt),
            api: '30day',
          }
          // save weather data to localStorage and state variable
          localStorage.setItem('weather', JSON.stringify(weather))
          setEventDayWeather(weather)
        }
        // API: Air pollution (current)
        const air = await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_API_KEY}`)
        setAirQ(((air.data.list[0].main.aqi) - 1) * grad)
        // save Air Quality Index (integer from 1 Good to 5 Very Poor) to localStorage
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
                <div className='artImg' style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.${airQ}), rgba(0, 0, 0, 0.${airQ})), url(https://framemark.vam.ac.uk/collections/${artObj[eventDayWeather.weatherIcon][0].id_img}/full/!${imgDimension},${imgDimension}/0/default.jpg)` }}>
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
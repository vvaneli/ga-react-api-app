import { useEffect, useState } from 'react'
import { artObj } from '../components/ArtObj.jsx'
import axios from 'axios'

export default function Info() {

  const [eventDayWeather, setEventDayWeather] = useState()
  const [eventCity, setEventCity] = useState()

  //! UPDATE WITH LOCAL STORAGE ITEMS
  const cnt = 1 // Number() // no. of days until event day
  const lat = 51.5073219
  const lon = -0.1276474
  const eventName = 'Sister\'s wedding'
  const eventDate = new Date().getTime()

  // WIDGET SIZE
  const widgetWidth = 349

  // IMAGES
  const imgDimension = (widgetWidth * 2)  // max 2500px inc. margins

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
              <h1 className="eventName">{eventName}</h1>
              <p className="eventDate">{eventDate}, {eventCity.name}</p>
              <p className="owFeelsLike">{eventDayWeather.feels_like.day}</p>
              <p className="owDescription">{eventDayWeather.weather[0].description}</p>
            </section>
            <section id="art">
              <div className="artImg" style={{backgroundImage: `url(https://framemark.vam.ac.uk/collections/${artObj[eventDayWeather.weather[0].icon][0].id}/full/!${imgDimension},${imgDimension}/0/default.jpg)`}}>
              </div>
            </section>
            <section id="credits">
              <p className=""></p>
            </section>
          </>
        )
        :
        <p>Waiting for the weather</p>
      }
    </>
  )
}
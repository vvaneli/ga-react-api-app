import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { dayOfWeek, month } from '../components/DateFormat.jsx'

import NoArt from '../components/NoArt.jsx'

// Images and Icons
import iconEditLoc from '../icons/location_on_FILL0_wght400_GRAD0_opsz24.svg'
import iconHome from '../icons/home_24dp_FILL0_wght400_GRAD0_opsz24.svg'
import iconArt from '../icons/wall_art_24dp_FILL0_wght400_GRAD0_opsz24.svg'
import iconInfo from '../icons/info_FILL0_wght400_GRAD0_opsz24.svg'
import iconAirQ from '../icons/factory_24dp_FILL0_wght400_GRAD0_opsz24.svg'
import back from '../images/Back4_@2x.jpg' // background image

export default function ArtBack() {

  const [eventName, setEventName] = useState('')
  const [eventDate, setEventDate] = useState(Date())
  const [eventLocation, setEventLocation] = useState('')
  const [temperature, setTemperature] = useState(Number())
  const [description, setDescription] = useState('')
  const [airQ, setAirQ] = useState(Number())

  const navigate = useNavigate()

  useEffect(() => {
    if (NoArt() === true) {
      // if (NoArt === true ){
      navigate('/')
    }
    setEventName((JSON.parse(localStorage.getItem('events'))).eventName)
    setEventDate((JSON.parse(localStorage.getItem('events'))).eventDate)
    setEventLocation((JSON.parse(localStorage.getItem('events'))).eventLocation)
    setTemperature(((JSON.parse(localStorage.getItem('weather'))).temperatureC))
    setDescription((JSON.parse(localStorage.getItem('weather'))).description)
    setAirQ(JSON.parse(localStorage.getItem('airQuality')))
  }, [])

  function airQText() {
    if (airQ <= 1) {
      return ('1 Good')
    }
    if (airQ === 2) {
      return ('2 Fair')
    }
    if (airQ === 3) {
      return ('3 Moderate')
    }
    if (airQ === 4) {
      return ('4 Poor')
    }
    if (airQ >= 5) {
      return ('5 Very poor')
    }
  }

  return (
    <section id='info' style={{ backgroundImage: `url(${back})` }}>
      <main className='artBack'>
        <div className='stickerEvent'>
          <h1 className='eventName'>{eventName}</h1>
          <p className='eventCity'>{eventLocation}</p>
          <p className='eventDate'>{dayOfWeek[new Date(eventDate).getDay()]} {new Date(eventDate).getDate()} {month[new Date(eventDate).getMonth()]}</p>
        </div>
        <div id='air'>
          <img src={iconAirQ} alt='Air quality' />
          <span>{airQText()}</span>
        </div>
        <div className='stampForecast'>
          <div className='circle degreesNumBig'><span className='degreesNum'>{temperature.toFixed(0)}</span></div>
          <p className='owFeelsLike'>{temperature.toFixed(0)}</p>
          <p className='owDescription'>{description}</p>
        </div>
      </main>
      <nav className='iconBtn'>
        <Link to={'/home'}>
          <img src={iconHome} alt='Home' />
        </Link>
        <Link to={'/create-event'}>
          <img src={iconEditLoc} alt='Edit' />
        </Link>
        <Link to={'/credits'}>
          <img src={iconInfo} alt='Credits' />
        </Link>
        <Link to={'/art'}>
          <img src={iconArt} alt='Art' />
        </Link>
      </nav>
    </section>
  )
}
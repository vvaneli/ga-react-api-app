import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

// Icons
import iconClose from '../icons/close_24dp_FILL0_wght400_GRAD0_opsz24.svg'

export default function EventLocation() {

  const [options, setOptions] = useState([])
  const [formData, setFormData] = useState({})
  // const [eventLocation, setEventLocation] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    function checkLocalStorage() {
      // If local storage is empty, go to create events
      if (!localStorage.getItem('events')) {
        navigate('/create-events')
      }
      setFormData((JSON.parse(localStorage.getItem('events'))))
    }
    checkLocalStorage()
  }, [])

  // Get lat lon
  useEffect(() => {
    async function getLatLon() {
      try {
        // Get location from local storage
        const eventLocation = ((JSON.parse(localStorage.getItem('events'))).eventLocation)
        const { data } = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${eventLocation}&limit=50&appid=${import.meta.env.VITE_API_KEY}`)
        setOptions(data)
        // console.log(data)
      } catch (error) {
        setError(error.message)
      }
    }
    getLatLon()
  }, [])

  function handleLocation(option) {
    // save data to localStorage
    const saveData = ({ ...formData, lat: option.lat, lon: option.lon })
    localStorage.setItem('events', JSON.stringify(saveData))
    navigate('/art')
  }

  return (
    <section id='locationPicker'>
      <div className='scrollHeader'>
        <p className='scrollHeading'>Pick a City:</p>
        <Link to={'/create-event'}>
          <img className='close' src={iconClose} alt='Edit event and location' />
        </Link>
      </div>
      <div className='locationList'>
        {options.length > 0 ?
          (
            options.map(option => {
              const { lat, lon, country, state, name } = option
              // console.log(lat, lon, name, state, country)
              return (
                <div key={`${lat}-${lon}`} onClick={() => handleLocation(option)} className='cityOption'>
                  {name}
                  {/* Only show state and/or country if those fields have contents from the API */}
                  {(!state) ? '' : <>, {state}</>}
                  {(!country) ? '' : <>, {country}</>}
                </div>
              )
            })
          )
          :
          error ?
            <div className='locatioListError'>
              <p className='errorMsg'>{error}</p>
              <p className='errorEscapeBtn'>Edit Event</p>
            </div>
            :
            <div className='locationListError'>
              <p className='errorMsg'>{`We can't find this location. Go back and enter a valid city name, or choose another city nearby.`}</p>
              <Link to={'/create-event'}>
                <p className='errorEscapeBtn'>Edit Event</p>
              </Link>
            </div>
        }
      </div>
    </section>
  )

}

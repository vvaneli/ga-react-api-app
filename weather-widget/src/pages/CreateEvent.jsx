import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

// SVG icons
import iconHelp from '../icons/help_FILL0_wght400_GRAD0_opsz24.svg'
import iconReset from '../icons/delete_FILL0_wght400_GRAD0_opsz24.svg'
import iconSave from '../icons/check_circle_FILL0_wght400_GRAD0_opsz24.svg'

export default function CreateEvent() {

  const [formData, setFormData] = useState({
    eventName: '',
    eventDate: new Date(),
    eventLocation: '',
    lat: '',
    lon: '',
  })

  const [options, setOptions] = useState([])

  // const [date, setDate] = useState(new Date())

  const [error, setError] = useState('')

  const navigate = useNavigate()


  async function handleSubmit(e) {
    e.preventDefault()

    // save data to localStorage
    localStorage.setItem('events', JSON.stringify({ ...formData }))
    navigate('/info')
  }


  function handleLocation(option) {
    setFormData({ ...formData, lat: option.lat, lon: option.lon, eventLocation: option.name })
  }


  async function handleSelect(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setTimeout(async () => {
      try {
        const { data } = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${formData.eventLocation}&limit=50&appid=${import.meta.env.VITE_API_KEY}`)
        setOptions(data)
      } catch (error) {
        setError(error.message)
      }

    }, 10)
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function handleReset() {
    setFormData({
      eventName: '',
      eventDate: '',
      eventLocation: '',
      lat: '',
      lon: '',
    })
  }

  return (
    <section className='form-page'>
      <h1>Watch the weather for an upcoming event</h1>
      {/* <form onSubmit={handleSubmit} onKeyDown={(e) => e.preventDefault()}> */}
      <form className="form" onSubmit={handleSubmit}>

        <label htmlFor='eventName'>Event </label>
        <input
          type='text'
          name='eventName'
          id='eventName'
          placeholder='Insert event name'
          value={formData.eventName}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="eventDate">Date</label>
        <DatePicker
          selected={formData.eventDate}
          name='eventDate'
          id='eventDate'
          value={formData.eventDate}
          // onChange={date => setFormData({ ...formData, eventDate: date.toISOString().substring(0, 10) })}
          onChange={date => setFormData({ ...formData, eventDate: date.getTime() })}
        />
        <br />
        <label htmlFor="eventLocation">City</label>
        <input
          type='text'
          name='eventLocation'
          id='eventLocation'
          placeholder='Insert city name and press ENTER'
          value={formData.eventLocation}
          onChange={handleSelect}
        // onKeyDown={handleSelect}
        />
        <br />
        <div className="notifications">
        {/* if location comes back with more than one result have drop down menu */}
        {options.length > 1 ?
          options.map(option => {
            const { lat, lon, country, name } = option
            console.log(lat, lon)
            return (
              <div key={`${lat}-${lon}`} onClick={() => handleLocation(option)} className='cityOption'>{name}, {country}</div>
            )
          })
          :
          error ?
            <p class='errorMsg'>{error}</p>
            :
            <p class='errorMsg'>No other options available</p>
        }
        </div>

      <div className="formBtn">
        <Link to={'/'}>
          <img src={iconHelp} alt="Instructions" />
        </Link>
        <button type='button' onClick={handleReset}><img src={iconReset} alt="Reset" /></button>
        <button type='submit' ><img src={iconSave} alt="Save" /></button>
      </div>
      </form>
    </section>
  )
}
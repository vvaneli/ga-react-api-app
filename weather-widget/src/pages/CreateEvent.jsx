import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
// import axios from 'axios'
import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css' // copied to SCSS partial

// SVG icons
import iconHome from '../icons/home_24dp_FILL0_wght400_GRAD0_opsz24.svg'
import iconReset from '../icons/delete_FILL0_wght400_GRAD0_opsz24.svg'
import iconSave from '../icons/check_circle_FILL0_wght400_GRAD0_opsz24.svg'

export default function CreateEvent() {

  const navigate = useNavigate()

  // Max selectable date for date picker
  const today = new Date()
  const maxDate = today.setDate(today.getDate() + 30) // Advance Forecast = 30 days

  // State variables
  const [formData, setFormData] = useState({
    eventName: '',
    eventDate: '',
    eventLocation: '',
    lat: '',
    lon: '',
  })

  // If local storage is not empty, populate the form with the stored data
  useEffect(() => {
    function checkLocalStorage() {
      if (localStorage.getItem('events')) {
        setFormData(JSON.parse(localStorage.getItem('events')))
      }
    }
    checkLocalStorage()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    // save data to localStorage
    localStorage.setItem('events', JSON.stringify({ ...formData }))
    // navigate('/art')
    navigate('/create-event-location')
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Reset the form and clear localStorage
  function handleReset() {
    setFormData({
      eventName: '',
      eventDate: '',
      eventLocation: '',
      lat: '',
      lon: '',
    })
    localStorage.removeItem('events')
    localStorage.removeItem('weather')
    localStorage.removeItem('airQuality')
  }

  return (
    <section className='form-page'>
      <h1 className='formH1'>Watch the weather for an upcoming event</h1>
      <h2 className='formH2'>Art conveys how it feels on the day</h2>
      <form className='form' onSubmit={handleSubmit}>
        <div className='inputFields'>
          <label htmlFor='eventName'>Event </label>
          <input
            type='text'
            name='eventName'
            id='eventName'
            placeholder="What's the occasion?"
            maxLength='25'
            required
            value={formData.eventName}
            onChange={handleChange}
          />
          <br />
          <label htmlFor='eventDate'>Date</label>
          <DatePicker
            selected={formData.eventDate}
            name='eventDate'
            id='eventDate'
            value={formData.eventDate}
            dateFormat='EEEE dd MMMM'
            minDate={new Date()}
            maxDate={maxDate}
            placeholderText='Up to 30 days in advance'
            required
            nativeInputAriaLabel
            // onChange={date => setFormData({ ...formData, eventDate: date.toISOString().substring(0, 10) })}
            onChange={date => setFormData({ ...formData, eventDate: date.getTime() })}
          />
          <label htmlFor='eventLocation'>City</label>
          <input
            type='text'
            name='eventLocation'
            id='eventLocation'
            placeholder='Event location (nearest city name)'
            required
            value={formData.eventLocation}
            onChange={handleChange}
          />
        </div>
        <div className='formBtn'>
          <Link to={'/'}>
            <img src={iconHome} alt='Homepage' type='submit' />
          </Link>
          <button type='button' onClick={handleReset}><img src={iconReset} alt='Reset' /></button>
          <button type='submit' ><img src={iconSave} alt='Save' /></button>
        </div>
      </form>
    </section>
  )
}
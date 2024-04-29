import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css' // Copied to SCSS partial

// Components
import { dateFormatNewDate } from '../components/DateFormat.jsx'

// SVG icons
import iconHelp from '../icons/help_FILL0_wght400_GRAD0_opsz24.svg'
import iconReset from '../icons/delete_FILL0_wght400_GRAD0_opsz24.svg'
import iconSave from '../icons/check_circle_FILL0_wght400_GRAD0_opsz24.svg'

export default function CreateEvent() {

  const [formData, setFormData] = useState({
    eventName: '',
    // eventDate: '',
    eventDate: '',
    eventDateShow: dateFormatNewDate(),
    eventLocation: '',
    lat: '',
    lon: '',
  })

  const [options, setOptions] = useState([])

  const [error, setError] = useState('')

  const navigate = useNavigate()

  // For date picker: max selectable date
  const today = new Date()
  const maxDate = today.setDate(today.getDate() + 30) // For forecast up to 30 days

  // If local storage is not empty, setFormData with the stored data
  useEffect(() => {
    function checkLocalStorage() {
      if (localStorage.events !== undefined) {
        setFormData({})
        setFormData(JSON.parse(localStorage.getItem('events')))
        console.log('1 formData: ' + formData)
        console.log('localStorage.events is not null')
      }
    }
    checkLocalStorage()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    // save data to localStorage
    localStorage.setItem('events', JSON.stringify({ ...formData }))
    navigate('/info')
  }

  function handleLocation(option) {
    setFormData({ ...formData, lat: option.lat, lon: option.lon, eventLocation: option.name })
  }

  // Location options
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

  const [startDate, setStartDate] = useState();  

//   type ValuePiece = Date | null;

// type Value = ValuePiece | [ValuePiece, ValuePiece];



const [value, setValue] = useState(new Date());

  function updateDatePicker(data) {
    // date => setFormData({ ...formData, eventDate: date.getTime() })
(date) => setValue(date)
    console.log(setValue)
    console.log(value)
    // setFormData({ ...formData, [e.target.name]: e.target.value })
    // setFormData.eventDate = new Date().getDate
    // setFormData.eventDate = new Date()
    // (setFormData.eventDate)
    // console.log(formData.eventDate)
  }

  function datePickerAlert() {
    console.log('Invalid date')
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
    localStorage.clear()
  }

  // const [notificationStyle, setNotificationStyle] = useState('notifications')
  const [notificationStyle, setNotificationStyle] = useState('notificationsEmpty')
  // const [eventDateSelected, setEventDateSelected] = useState()



  return (
    <section className='form-page'>
      <h1>Watch the weather for an upcoming event</h1>
      {/* <form onSubmit={handleSubmit} onKeyDown={(e) => e.preventDefault()}> */}
      <form className='form' onSubmit={handleSubmit}>

        <label htmlFor='eventName'>Event </label>
        <input
          type='text'
          name='eventName'
          id='eventName'
          placeholder="What's the occasion?"
          maxLength='25'
          required
          selected={formData.eventName}
          value={formData.eventName}
          onChange={handleChange}
        />
        <br />
        <label htmlFor='eventDate'>Date</label>
        <DatePicker
        input type='date'
          selected={''}
          // selected={formData.eventDate}
          name='eventDate'
          id='eventDate'
          value={formData.eventDate}
          // dateFormat='EEEE dd MMMM'
          minDate={new Date()}
          maxDate={maxDate}
          placeholderText='Up to 30 days in advance'
          required
          nativeInputAriaLabel
          // onChange={(date) => setFormData(date)} 
          // onChange={date => setFormData.eventDate(date.getTime())}
          onChange={updateDatePicker}
          onInvalidChange = {datePickerAlert}
        // onChange={setFormData = (setFormData.eventDate)}
        // selected={setFormData = (setFormData.eventDate)}
        // onChange={date => setFormData({ ...formData, eventDate: date.toISOString().substring(0, 10) })}
        // onChange={date => setFormData({ ...formData, eventDate: date.getTime() })}
        // onChange={date => setFormData(setFormData.eventDate = date.getTime() )}
        />
        {/* <br /> */}
        <label htmlFor='eventLocation'>City</label>
        <input
          type='text'
          name='eventLocation'
          id='eventLocation'
          placeholder='Insert city name and press ENTER'
          required
          value={formData.eventLocation}
          onChange={handleSelect}
        // onKeyDown={handleSelect}
        />
        <br />
        {/* <div className='notifications'> */}
        {/* if location comes back with more than one result have drop down menu */}
        <div className={notificationStyle}>
          {options.length > 1 ?
            options.map(option => {
              const { lat, lon, country, state, name } = option
              console.log(lat, lon)
              return (
                <div key={`${lat}-${lon}`} onClick={() => handleLocation(option)} className='cityOption'>{name}
                  {/* Only show those fields if state and/or country fields have contents from the API */}
                  {(!state) ? '' : <>, {state}</>}
                  {(!country) ? '' : <>, {country}</>}
                </div>
              )
            })
            :
            // {setNotificationStyle = 'notifications'}
            error ?
              // <div className='notificationError'>
              // <p className='errorMsg'>{error}</p>
              <p className='errorMsg'>Chills! We can&#39;t find a place with that name.</p>
              // </div>
              :
              ''
            // setNotificationStyle('notifications')
          }
        </div>

        <div className='formBtn'>
          <Link to={'/'}>
            <img src={iconHelp} alt='Instructions' />
          </Link>
          <button type='button' onClick={handleReset}><img src={iconReset} alt='Reset' /></button>
          <button type='submit'><img src={iconSave} alt='Save' /></button>
        </div>
      </form>
    </section>
  )
}
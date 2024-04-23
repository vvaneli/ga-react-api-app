import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

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
        localStorage.setItem(`${formData.eventName}`, JSON.stringify({ ...formData }))
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
        <div className='form-page'>
            <h1>Create Event</h1>
            {/* <form onSubmit={handleSubmit} onKeyDown={(e) => e.preventDefault()}> */}
            <form onSubmit={handleSubmit}>
                <label htmlFor='eventName'>Event Name</label>
                <input
                    type='text'
                    name='eventName'
                    id='eventName'
                    placeholder='Insert event name'
                    value={formData.eventName}
                    onChange={handleChange}
                />
                <label htmlFor="eventDate">Event Date</label>
                <DatePicker
                    selected={formData.eventDate}
                    name='eventDate'
                    id='eventDate'
                    value={formData.eventDate}
                    // onChange={date => setFormData({ ...formData, eventDate: date.toISOString().substring(0, 10) })}
                    onChange={date => setFormData({ ...formData, eventDate: date.getTime() })}
                />
                <label htmlFor="eventLocation">Event City</label>
                <input
                    type='text'
                    name='eventLocation'
                    id='eventLocation'
                    placeholder='Insert city name and press ENTER'
                    value={formData.eventLocation}
                    onChange={handleSelect}
                    // onKeyDown={handleSelect}
                />
                {/* if location comes back with more than one result have drop down menu */}
                {options.length > 1 ?
                    options.map(option => {
                        const { lat, lon, country, name } = option
                        console.log(lat, lon)
                        return (
                            <div key={`${lat}-${lon}`} onClick={() => handleLocation(option)}>{name}, {country}</div>
                        )
                    })
                    :
                    error ?
                        <p>{error}</p>
                        :
                        <p>No other options available</p>
                }

                <button type='button' onClick={handleReset}>Reset</button>
                <button type='submit' >Save Event</button>
                <Link to={'/'}>
                    <button type='button'>Help</button>
                </Link>
            </form>
        </div>
    )
}
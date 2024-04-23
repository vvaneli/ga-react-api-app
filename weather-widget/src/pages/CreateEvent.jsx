import { useState } from 'react'
import { useNavigate, Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import DatePicker from 'react-datepicker'



export default function CreateEvent() {

    const [formData, setFormData] = useState({
        eventName: '',
        eventDate: '',
        eventLocation: '',
        lat: '',
        lon: '',
    })

    const [options, setOptions] = useState([])

    const [error, setError] = useState()

    const navigate = useNavigate()


    async function handleSubmit(e) {
        e.preventDefault()
        // save data to localStorage
        // navigate('/painting')
    }

    function handleLocation(option) {
        // setFormData({ ...formData, lat: e.target.dataset.lat, lon: e.target.dataset.lon, eventLocation: e.target.value })
        console.log(option)
    }


    async function handleSelect(e) {
        if (e.key === 'Enter') {
            try {
                const { data } = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${formData.eventLocation}&limit=50&appid=${import.meta.env.VITE_API_KEY}`)
                setOptions(data)
            } catch (error) {
                console.log(error)
            }
        }
        // console.log(options)
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
                <DatePicker></DatePicker>
                <label htmlFor="eventLocation">Event Location</label>
                <input
                    type='text'
                    name='eventLocation'
                    id='eventLocation'
                    placeholder='Insert city name and press ENTER'
                    value={formData.eventLocation}
                    onChange={handleChange}
                    onKeyDown={handleSelect}
                />
                {/* <select name="locations" id="locations" onChange={(e) => {
                    setCurrentOption({ ...currentOption, lat: e.target.dataset.lat, lon: e.target.dataset.lon, cityName: e.target.value, country: e.target.dataset.country })
                }}
                value={currentOption}
                > */}
                    {/* if location comes back with more than one result have drop down menu */}
                    {options.length > 1 ?
                        options.map(option => {
                            const { lat, lon, country, name } = option
                            console.log()
                            return (
                                <div key={lat.concat(lon)} onClick={() => handleLocation(option)}>{name}, {country}</div>
                        )
                        })
                        :
                        error ?
                            <p>{error}</p>
                            :
                            <p>No other options available</p>
                    }
                {/* </select> */}

                <button type='button' onClick={handleReset}>Reset</button>
                <button type='submit'>Save Event</button>
                <Link to={'/'}>
                    <button type='button'>Help</button>
                </Link>
            </form>
        </div>
    )
}
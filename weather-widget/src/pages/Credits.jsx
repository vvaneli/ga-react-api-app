import { useEffect, useState } from 'react'
import { useNavigate, Link } from "react-router-dom"
import { artObj } from '../components/ArtObj.jsx'
import axios from 'axios'

import NoArt from '../components/NoArt.jsx'

// Images and Icons
import iconEditLoc from '../icons/location_on_FILL0_wght400_GRAD0_opsz24.svg'
import iconHome from '../icons/home_24dp_FILL0_wght400_GRAD0_opsz24.svg'
import iconArt from '../icons/wall_art_24dp_FILL0_wght400_GRAD0_opsz24.svg'
import artBack from '../icons/partly_cloudy_day_24dp_FILL0_wght400_GRAD0_opsz24.svg'

export default function Art() {

  // State variables
  const [title, setTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [date, setDate] = useState('')
  const [copyright, setCopyright] = useState('')
  const [error, setError] = useState('')

  // If local storage is empty, go to homepage
  const navigate = useNavigate()

  useEffect(() => {
    if (NoArt() === true) {
      // if (NoArt === true ){
      navigate('/')
    }
  }, [])

  useEffect(() => {
    async function getArtCredits() {
      try {
        // Get weather icon from local storage
        const weatherIcon = ((JSON.parse(localStorage.getItem('weather'))).weatherIcon)
        // Call V&A API
        const { data } = await axios.get(`https://api.vam.ac.uk/v2/object/${artObj[weatherIcon][0].id_obj}`)
        setTitle(data.record.titles[0].title) // title of work
        setArtist(data.record.artistMakerPerson[0].name.text) // artist name
        // console.log(data.record.briefDescription) // brief description
        setDate(data.record.productionDates[0].date.text) // production dates
        setCopyright(data.meta.images._images_meta[0].copyright) // copyright notice
      } catch (error) {
        console.log(error)
        setError(error.message)
      }
    }
    getArtCredits()
  }, [])

  return (
    <section id="credits">
      <div className='creditInfo'>
        <h1 className='title'>{title} <span className='titleDetail'>{!error && `(detail)`}</span></h1>
        <p className='artist'>{artist}</p>
        <p className='date'>{date}</p>
      </div>
      {error && <p><small>{error}</small></p>}
      <hr className='line' />
      <aside className='smallprint'>
        <p><small className='airQNotice'>When air pollution level is higher (from &lsquo;fair&rsquo; to &lsquo;very poor&rsquo;), art looks darker.</small></p>
        <p><small className='attribution'>Image: {copyright}. Weather: Open Weather</small></p>
      </aside>
      <div className='iconBtn'>
        <Link to={'/home'}>
          <img src={iconHome} alt='Homepage' />
        </Link>
        <Link to={'/create-event'}>
          <img src={iconEditLoc} alt='Edit event and location' />
        </Link>
        <Link to={'/art-back'}>
          <img src={artBack} alt='Event weather' />
        </Link>
        <Link to={'/art'}>
          <img src={iconArt} alt='Art' />
        </Link>
      </div>
    </section>
  )
}
import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import coverImage from '../images/SK-A-3259_crop_698w440h.jpg' // cover image
import logo from '../logo/FeelsLike_logo_349w220h.svg'

import NoArt from '../components/NoArt.jsx'

export default function Welcome() {
  const navigate = useNavigate()

  useEffect(() => {
    if (!NoArt()){
      navigate('/art')
    }
  }, [])

  return (
    <>
      <Link to={'/create-event'}>
        <section className='home' style={{ backgroundImage: `url(${logo}), url(${coverImage})` }}>
        </section>
      </Link>
    </>
  )
}
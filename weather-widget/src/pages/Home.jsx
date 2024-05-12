import { Link } from 'react-router-dom'

import coverImage from '../images/SK-A-3259_crop_698w440h.jpg' // cover image
import logo from '../logo/FeelsLike_logo_349w220h.svg'

export default function Home() {

  return (
    <>
      <Link to={'/create-event'}>
        <section className='home' style={{ backgroundImage: `url(${logo}), url(${coverImage})` }}>
        </section>
      </Link>
    </>
  )
}
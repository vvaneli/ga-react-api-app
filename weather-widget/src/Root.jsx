import { Routes, Route } from 'react-router-dom'

// Page Components
import Welcome from './pages/Welcome.jsx' // Landing page
import Home from './pages/Home.jsx' // Home page
import CreateEvent from './pages/CreateEvent.jsx'
import EventLocation from './pages/EventLocation.jsx'
import Art from './pages/Art.jsx'
import ArtBack from './pages/ArtBack.jsx'
import Credits from './pages/Credits.jsx'


export default function Root() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/home" element={<Home />} />
      <Route path="/create-event" element={<CreateEvent />} />
      <Route path="/event-location" element={<EventLocation />} />
      <Route path="/art" element={<Art />} />
      <Route path="/art-back" element={<ArtBack />} />
      <Route path="/credits" element={<Credits />} />
    </Routes>
  )
}
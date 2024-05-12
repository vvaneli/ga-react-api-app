import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './Root.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Styles
import './styles/main.scss'

// Page Components
import Welcome from './pages/Welcome.jsx'
import Home from './pages/Home.jsx'
import CreateEvent from './pages/CreateEvent.jsx'
import EventLocation from './pages/EventLocation.jsx'
import Art from './pages/Art.jsx'
import ArtBack from './pages/ArtBack.jsx'
import Credits from './pages/Credits.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: <Welcome />
      },
      {
        path: 'home',
        element: <Home />
      },
      {
        path: 'create-event',
        element: <CreateEvent />
      },
      {
        path: 'create-event-location',
        element: <EventLocation />
      },
      {
        path: 'art',
        element: <Art />
      },
      {
        path: 'art-back',
        element: <ArtBack />
      },
      {
        path: 'credits',
        element: <Credits />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

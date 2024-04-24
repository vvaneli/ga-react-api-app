import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './Root.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Styles
import './styles/main.scss'

// Page Components
import Welcome from './pages/Welcome.jsx'
import CreateEvent from './pages/CreateEvent.jsx'
import Art from './pages/Art.jsx'
import Info from './pages/Info.jsx'

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
        path: 'create-event',
        element: <CreateEvent />
      },
      {
        path: 'art',
        element: <Art />
      },
      {
        path: 'info',
        element: <Info />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

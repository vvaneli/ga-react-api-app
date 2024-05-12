import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// If local storage is empty, go to homepage
// Else get items from local storage

export default function CheckLocalStorage() {
  const navigate = useNavigate()

  useEffect(() => {
    function checkLocalStorage() {
      if (!localStorage.getItem('events')) { // Not localStorage.events, because it's not an object
        navigate('/')
      }
    }
    checkLocalStorage()
  }, [])

}



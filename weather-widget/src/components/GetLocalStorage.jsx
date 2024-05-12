    // Get from local storage
    export const lat = (JSON.parse(localStorage.getItem('events'))).lat
    export const lon = (JSON.parse(localStorage.getItem('events'))).lon
    export const eventName = (JSON.parse(localStorage.getItem('events'))).eventName
    export const eventDate = (JSON.parse(localStorage.getItem('events'))).eventDate
    export  const eventLocation = (JSON.parse(localStorage.getItem('events'))).eventLocation
    // 30 day forecast, valid cnt range 1 to 30
    export  const cnt = (Math.round((JSON.parse(localStorage.getItem('events')).eventDate - (new Date()).getTime()) / (1000 * 3600 * 24)))

// export default function GetLocalStorage() {

    // Get from local storage
    // export const lat = (JSON.parse(localStorage.getItem('events'))).lat
    // export const lon = (JSON.parse(localStorage.getItem('events'))).lon
    // export const eventName = (JSON.parse(localStorage.getItem('events'))).eventName
    // export const eventDate = (JSON.parse(localStorage.getItem('events'))).eventDate
    // export  const eventLocation = (JSON.parse(localStorage.getItem('events'))).eventLocation
    // 30 day forecast, valid cnt range 1 to 30
    // export  const cnt = (Math.round((JSON.parse(localStorage.getItem('events')).eventDate - (new Date()).getTime()) / (1000 * 3600 * 24)))
  
// }

// import { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'

// If local storage is empty, go to homepage
// Else get items from local storage

// export default function GetLocalStorage() {

//   // useEffect(() => {
//     // function checkLocalStorage() {
//       if (localStorage.events !== undefined) {
//         // Get from local storage

//       }
//       GetLocalStorage()
//     }
    
  // }, [])

// }



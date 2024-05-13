export default function OldArt() {
  const oldArt =
      (
        (!localStorage.getItem('events')) // if true = no data
        // || (!localStorage.getItem('weather')) // if true = no data
        // || (!localStorage.getItem('airQuality')) // if true = no data
        // || ((JSON.parse((localStorage.getItem('events'))).eventDate.getDate()) < (Date.now())) //if true = expired (less than now)
        || (Math.ceil((JSON.parse(localStorage.getItem('events')).eventDate - (new Date()).getTime()) / (1000 * 3600 * 24))) < 0
    )
        ? true : false
        console.log('oldArt: ' + oldArt)
      return oldArt
    // TRUE –> go to homepage, or form page
    // FALSE –> go to art page, or get data from local storage
  }
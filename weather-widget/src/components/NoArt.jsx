export default function NoArt() {
const noArt =
    (
      (!localStorage.getItem('events')) // if true = no data
      || (!localStorage.getItem('weather')) // if true = no data
      || (!localStorage.getItem('airQuality')) // if true = no data
      || (Math.ceil((JSON.parse(localStorage.getItem('events')).eventDate - (new Date()).getTime()) / (1000 * 3600 * 24))) < 0
      // || ((JSON.parse((localStorage.getItem('events'))).eventDate) < (Date.now())) //if true = expired (less than now)
  )
      ? true : false
      console.log('noArt: ' + noArt)
    return noArt
  // TRUE –> go to homepage, or form page
  // FALSE –> go to art page, or get data from local storage
}
  


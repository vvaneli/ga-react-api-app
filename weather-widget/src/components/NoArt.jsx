export function NoArt() {
const noArt =
    (
      (!localStorage.getItem('events')) // if true = no data
      || (!localStorage.getItem('weather')) // if true = no data
      || (!localStorage.getItem('airQuality')) // if true = no data
      || ((JSON.parse((localStorage.getItem('events'))).eventDate) < (Date.now())) //if true = expired (less than now)
  )
      ? true : false
      console.log('noArt: ' + noArt)
    return noArt
  // TRUE –> go to homepage, or form page
  // FALSE –> go to art page, or get data from local storage
}

export function oldArt() {
  const oldArt =
      (
        (!localStorage.getItem('events')) // if true = no data
        // || (!localStorage.getItem('weather')) // if true = no data
        // || (!localStorage.getItem('airQuality')) // if true = no data
        || ((JSON.parse((localStorage.getItem('events'))).eventDate) < (Date.now())) //if true = expired (less than now)
    )
        ? true : false
        console.log('oldArt: ' + oldArt)
      return oldArt
    // TRUE –> go to homepage, or form page
    // FALSE –> go to art page, or get data from local storage
  }
  


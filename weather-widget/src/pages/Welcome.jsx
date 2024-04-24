import { Link } from "react-router-dom"

export default function Welcome() {
  return (
    <>
      <section>
        <h1>Welcome to weather widget!</h1>
        {/* <h2>How to appreciate the weather more through art?</h2> */}
        <ol>
          <li>Enter your event name.</li>
          <li>Enter your event date.</li>
          <li>Enter your event location, select the right option if required.</li>
          <li>Click save event and watch the magic happen.</li>
        </ol>
        <Link to={'/create-event'}>
          <button className='add-event'>Start</button>
        </Link>
      </section>
    </>
  )
}
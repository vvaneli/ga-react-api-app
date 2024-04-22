import { useNavigate, Link } from "react-router-dom"

export default function Welcome() {
    return (
        <>
            <h1>Welcome to weather widget!</h1>
            <p>Cupcake ipsum dolor sit amet gummi bears cookie. Jelly beans powder gummies gummies topping cookie apple pie halvah. Jelly-o danish sesame snaps pastry chocolate cake tootsie roll I love chupa chups gummi bears.
                Jujubes chocolate cake jelly-o candy ice cream toffee. Danish halvah bear claw cotton candy oat cake tart macaroon lemon drops. Chupa chups dessert biscuit chocolate bar ice cream candy cheesecake chocolate.
                Candy chocolate apple pie pie shortbread I love jelly-o apple pie pastry. Topping tart cheesecake liquorice cookie icing I love shortbread. Cake ice cream macaroon candy chupa chups chocolate cake I love cheesecake. Jujubes toffee tootsie roll pudding gummies.
                Oat cake topping topping bear claw jelly beans powder donut jujubes fruitcake. Cotton candy tiramisu candy canes soufflé shortbread soufflé brownie. Sesame snaps caramels muffin biscuit tootsie roll cupcake jujubes donut jelly.</p>
            <Link to={'/create-event'}>
                <button className='add-event'>Start</button>
            </Link>


        </>
    )
}
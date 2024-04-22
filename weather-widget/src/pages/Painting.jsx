import { Link } from "react-router-dom"

export default function Painting() {
    return (
        <Link to={'/info'}>
            <div className="painting">
                hello world!
            </div>
        </Link>
    )
}
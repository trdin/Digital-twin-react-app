import Button from "./Button"
import { Link } from "react-router-dom";
import { UserContext } from "../userContext";

function Header(props) {
    return (
        <>

            <nav className="navbar navbar-expand-lg sticky-top navbar-dark darkBackground">
                <a className="navbar-brand" href="/">Navbar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item"><Link className="nav-link" to='/'>Home</Link></li>
                        <li className="nav-item"><Link className="nav-link" to='/studentWork'>StudentWork</Link></li>
                        <li className="nav-item"><Link className="nav-link" to='/bars'>Bars</Link></li>
                        <UserContext.Consumer>
                            {context => (
                                context.user ?
                                    <>
                                        <li className="nav-item"><Link className="nav-link" to='/'>NOT YET</Link></li>
                                        <li className="nav-item"><Link className="nav-link" to='/profile'>Profile</Link></li>
                                        <li className="nav-item"><Link className="nav-link" to='/logout'>Logout</Link></li>
                                    </>
                                    :
                                    <>
                                        <li className="nav-item"><Link className="nav-link" to='/login'>Login</Link></li>
                                        <li className="nav-item"><Link className="nav-link" to='/register'>Register</Link></li>
                                    </>
                            )}
                        </UserContext.Consumer>
                    </ul>
                </div>
            </nav>
        </>
    )
}
export default Header
import { useContext } from 'react';
import { Link } from "react-router-dom";
import { UserContext } from "../userContext";

function Header(props) {
    const userContext = useContext(UserContext);
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
                        <li className="nav-item"><Link className="nav-link" to='/restaurants'>Restaurants</Link></li>
                        <li className="nav-item"><Link className="nav-link" to='/events'>Events</Link></li>
                        <li className="nav-item"><Link className="nav-link" to='/wifis'>Wifis</Link></li>
                        <li className="nav-item"><Link className="nav-link" to='/dorms'>Dorms</Link></li>
                        <li className="nav-item"><Link className="nav-link" to='/faculties'>Faculties</Link></li>
                            {
                                userContext.user ?
                                    <>
                                        {!userContext.user.admin ? "" :
                                            <li className="nav-item"><Link className="nav-link" to='/admin'>Administrator Panel</Link></li>}
                                        <li className="nav-item"><Link className="nav-link" to='/profile'>Profile</Link></li>
                                        <li className="nav-item"><Link className="nav-link" to='/logout'>Logout</Link></li>
                                    </>
                                    :
                                    <>
                                        <li className="nav-item"><Link className="nav-link" to='/login'>Login</Link></li>
                                        <li className="nav-item"><Link className="nav-link" to='/register'>Register</Link></li>
                                    </>
                            }
                    </ul>
                </div>
            </nav>
        </>
    )
}
export default Header;
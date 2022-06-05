import { useContext } from 'react';
import { Link } from "react-router-dom";
import { UserContext } from "../userContext";

function Header(props) {
    const userContext = useContext(UserContext);
    return (
        <>

            <nav className="navbar navbar-expand-lg sticky-top navbar-dark darkBackground align-items-baseline">
                <a className="navbar-brand" href="/">SMLTG</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item"><Link className="nav-link" to='/'>Domov</Link></li>
                        <li className="nav-item"><Link className="nav-link" to='/studentWork'>Študentsko Delo</Link></li>
                        <li className="nav-item"><Link className="nav-link" to='/bars'>Bari</Link></li>
                        <li className="nav-item"><Link className="nav-link" to='/restaurants'>Restavracije</Link></li>
                        <li className="nav-item"><Link className="nav-link" to='/events'>Dogodki</Link></li>
                        <li className="nav-item"><Link className="nav-link" to='/wifis'>Wifi</Link></li>
                        <li className="nav-item"><Link className="nav-link" to='/dorms'>Študentski Domovi</Link></li>
                        <li className="nav-item"><Link className="nav-link" to='/faculties'>Fakultete</Link></li>
                        {
                            userContext.user ?
                                <>
                                    {!userContext.user.admin ? "" :
                                        <li className="nav-item"><Link className="nav-link" to='/admin'>Administratorska Panela</Link></li>}
                                    <li className="nav-item"><Link className="nav-link" to='/profile'>Profil</Link></li>
                                    <li className="nav-item"><Link className="nav-link" to='/logout'>Izpis</Link></li>
                                </>
                                :
                                <>
                                    <li className="nav-item"><Link className="nav-link" to='/login'>Vpis</Link></li>
                                    <li className="nav-item"><Link className="nav-link" to='/register'>Registeracija</Link></li>
                                </>
                        }
                    </ul>
                </div>
            </nav>
        </>
    )
}
export default Header;
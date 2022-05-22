import { useContext } from 'react';
import { UserContext } from '../userContext';
import { Navigate } from 'react-router-dom';

function Logout() {
    const userContext = useContext(UserContext);
    const logout = async function () {
        userContext.setUserContext(null);
        const res = await fetch(process.env.REACT_APP_mainAPIurl + "/users/logout");
        if (res === undefined)
            console.error(res)
    }
    logout();

    return (
            <Navigate replace to="/" />
    );
}

export default Logout;
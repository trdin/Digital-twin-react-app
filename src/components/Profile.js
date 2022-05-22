import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../userContext';
import { Navigate } from 'react-router-dom';
import Jumbotron from './Jumbotron';

function Profile() {
    const userContext = useContext(UserContext);
    const [profile, setProfile] = useState({});

    useEffect(function () {
        const getProfile = async function () {
            const res = await fetch(process.env.REACT_APP_mainAPIurl + "/users/profile", { credentials: "include" });
            const data = await res.json();
            setProfile(data);
        }
        getProfile();
    }, []);
    return (
        <>
            {!userContext.user ? <Navigate replace to="/login" /> : ""}
            <Jumbotron title="User profile"
                bgcolor="greenBackground"
                textColor="black"
                textOrient="center"
            />
            <div className='container'>
                <Jumbotron
                    description={"Username: " + profile.username}
                    bgcolor="darkBackground"
                    textColor="white"
                    textOrient="left"
                />
                <Jumbotron
                    description={"Email: " + profile.email}
                    bgcolor="whiteBackground"
                    textColor="black"
                    textOrient="left"
                />
                <Jumbotron
                    description={"UserID: " + profile._id}
                    bgcolor="darkBackground"
                    textColor="white"
                    textOrient="left"
                />
            </div>
        </>
    );
}

export default Profile;
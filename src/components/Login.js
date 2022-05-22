import { useContext, useState, useEffect} from 'react';
import { UserContext } from '../userContext';
import { Navigate } from 'react-router-dom';
import Button from './Button'

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const userContext = useContext(UserContext);

    useEffect(function () {
        // setUsername("user1");
        // setPassword("123456");
    })

    async function Login(e) {
        e.preventDefault();
        const res = await fetch(process.env.REACT_APP_mainAPIurl + "/users/login", {
            method: "POST",
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        const data = await res.json();
        // console.log(data);
        if (data._id !== undefined) {
            userContext.setUserContext(data);
        } else {
            setUsername("");
            setPassword("");
            setError("Invalid username or password");
            console.log(data)
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-8">
                    <div className="card mt-5 text-center" >
                        <div className="card-body">

                            <form onSubmit={Login} className="form-group">
                                <div className="form-group">
                                    {userContext.user ? <Navigate replace to="/" /> : ""}
                                    <input type="username" className="form-control" name="username" placeholder="Username"
                                        value={username} onChange={(e) => (setUsername(e.target.value))} required />
                                </div>
                                <div className="form-group">
                                    <input type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
                                        value={password} onChange={(e) => (setPassword(e.target.value))} required />
                                </div>
                                <div className="form-group">
                                    <Button text="Login" onClick={Login} />
                                </div>
                                {error !== "" ? <label className="alert alert-danger">{error}</label> : ""}
                            </form>
                        </div>
                    </div >
                </div>
            </div>
        </div >

    );
}

export default Login;
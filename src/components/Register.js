import { useState } from 'react';
import Button from './Button';
import ReCAPTCHA from "react-google-recaptcha";

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

function Register() {
    const [username, setUsername] = useState([]);
    const [password, setPassword] = useState([]);
    const [repPassword, setRepPassword] = useState([]);
    const [email, setEmail] = useState([]);
    const [error, setError] = useState("");
    //const [ReCaptcha, setReCaptcha] = useState("");
    async function Register(e) {
        e.preventDefault();

        if (password.length >= 6 && password == repPassword && validateEmail(email)) {
            const res = await fetch("http://localhost:3000/users", {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    username: username,
                    password: password,
                })
            });
            console.log(res)
            const data = await res.json();
            if (data._id !== undefined) {
                window.location.href = "/";
            }
            else {
                setUsername("");
                setPassword("");
                setEmail("");
                setError("Registration failed");
            }
        } else {
            setError("Data Input Error");
        }
    }



    return (

        <form onSubmit={Register}>
            <div className="form-group">
                <input type="text" className="form-control" name="email" placeholder="Email" value={email} onChange={(e) => (setEmail(e.target.value))} />
            </div>
            <div className="form-group">
                <input type="text" className="form-control" name="username" placeholder="Username" value={username} onChange={(e) => (setUsername(e.target.value))} />
            </div>
            <div className="form-group">
                <input type="password" className="form-control" name="password" placeholder="Password" value={password} onChange={(e) => (setPassword(e.target.value))} />
            </div>
            <div className="form-group">
                <input type="password" className="form-control" name="repeat-password" placeholder="Repeat Password" value={repPassword} onChange={(e) => (setRepPassword(e.target.value))} />
            </div>
            <div className="form-group">
                <Button text="Login" />
            </div>

            {error != "" ? <label className="alert alert-danger">{error}</label> : ""}

        </form>

    );
}

export default Register;
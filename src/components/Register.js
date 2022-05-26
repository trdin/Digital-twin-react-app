import { useState } from 'react';
import Button from './Button';
// import ReCAPTCHA from "react-google-recaptcha";

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
        if (!validateEmail(email)) {
            setError("Please use a valid email")
            return
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters long")
            return
        }
        if (password !== repPassword) {
            setError("Passwords do not match")
            return
        }

        const res = await fetch(process.env.REACT_APP_mainAPIurl + "/users", {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                username: username,
                password: password,
            })
        });
        const data = await res.json();
        if (data._id === undefined) {
            setUsername("");
            setPassword("");
            setEmail("");
            setError("Registration failed");
            console.error(data)
        }
        window.location.href = "/login";
        setError("")
    }



    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-8">
                    <div className="card mt-5 text-center" >
                        <div className="card-body">
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
                                    <Button text="Register" />
                                </div>

                                {error !== "" ? <label className="alert alert-danger">{error}</label> : ""}

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Register;
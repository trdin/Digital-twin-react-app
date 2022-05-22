import { useState } from 'react';
const Syncfetch = require('sync-fetch')


function FacultyFrame() {
    async function Add(e) {
        e.preventDefault();
        setPostSuccess("")
        setPostError("")
        const nominatimData = Syncfetch(process.env.REACT_APP_nominatimAPIurl + `/search.php?q=${address}&format=jsonv2`)
        var location = nominatimData.json()
        if (location === undefined || location.length === 0) {
            setPostError("Invalid address")
            return
        }
        const res = await fetch(process.env.REACT_APP_mainAPIurl + '/faculties/', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                address: address,
                latitude: location[0].lat,
                longitude: location[0].lon,
                dataSeriesTitle: 'faculties'
            })
        }).catch(errror => { console.error(errror); });
        const data = await res.json();
        if (data === undefined || data._id === undefined) {
            console.error(data || "unknown error")
            setPostError("Error")
        } else
            setPostSuccess("Success")
        window.location.reload(true);
    }

    const [postError, setPostError] = useState('');
    const [postSuccess, setPostSuccess] = useState('');

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    return (
        <div className="jumbotron jumbotron-fluid text-center shadow-sm greenBackground text-white">
            <h5>add Faculty</h5>
            <form onSubmit={Add} className="form my-2 my-lg-0 justify-content-center">
                <div className="container">
                    <div className="form-group d-flex flex-column align-items-baseline">
                        <label className="label default-label pl-2">Name</label>
                        <input className="form-control" type="text" name="name" placeholder="name" aria-label="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group d-flex flex-column align-items-baseline">
                        <label className="label default-label pl-2">Address</label>
                        <input className="form-control" type="text" name="address" placeholder="address" aria-label="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" type="submit" >Add</button>
                    </div>
                </div>
                {postError === "" ? "" : <div className="alert alert-danger mt-3" role="alert">{postError}</div>}
                {postSuccess === "" ? "" : <div className="alert alert-success mt-3" role="alert">{postSuccess}</div>}
            </form>
        </div>
    )
}
export default FacultyFrame;
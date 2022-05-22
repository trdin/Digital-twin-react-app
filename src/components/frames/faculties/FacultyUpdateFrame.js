import { useState, useEffect } from 'react';

function FacultyUpdateFrame(props) {
    var faculty = props.faculty;

    async function Delete(e) {
        e.preventDefault();
        window.location.reload(true);
        setPutSuccess("")
        setPutError("")
        const res = await fetch(process.env.REACT_APP_mainAPIurl + '/faculties/' + faculty._id, {
            method: 'DELETE',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: faculty._id })
        }).catch(errror => { console.error(errror); });
        const data = await res.json();
        if (data === undefined || data._id === undefined) {
            console.error(data || "unknown error")
            setPutError("Error")
        } else
            setPutSuccess("Success")
    }
    async function Update(e) {
        e.preventDefault();
        setPutSuccess("")
        setPutError("")
        const res = await fetch(process.env.REACT_APP_mainAPIurl + '/faculties/' + faculty._id, {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                address: address
            })
        }).catch(errror => { console.error(errror); });
        const data = await res.json();
        if (data === undefined || data._id === undefined) {
            console.error(data || "unknown error")
            setPutError("Error")
        } else
            setPutSuccess("Success")
    }
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    useEffect(function () {
        setName(faculty.name)
        setAddress(faculty.address)
    }, [faculty]);

    const [putError, setPutError] = useState('');
    const [putSuccess, setPutSuccess] = useState('');
    if (faculty === undefined)
        return <></>
    return (
        <div className="jumbotron jumbotron-fluid dataContainer text-center shadow-sm">
            <h5>{faculty.name}</h5>
            <form onSubmit={Update} className="form my-2 my-lg-0 justify-content-center">
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
                        <button className="btn btn-success" type="submit" >Change</button>
                    </div>
                </div>

            </form>
            <form onSubmit={Delete}>
                <button className="btn btn-danger" type="submit" >Delete</button>
            </form>

            {putError === "" ? "" : <div className="alert alert-danger mt-3" role="alert">{putError}</div>}
            {putSuccess === "" ? "" : <div className="alert alert-success mt-3" role="alert">{putSuccess}</div>}
        </div>
    )
}
export default FacultyUpdateFrame;
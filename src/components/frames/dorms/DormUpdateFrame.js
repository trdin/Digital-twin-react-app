import { useState, useEffect } from 'react';

function DormUpdateFrame(props) {
    var dorm = props.dorm;
    async function Delete(e) {
        e.preventDefault();
        window.location.reload(true);
        setPutSuccess("")
        setPutError("")
        const res = await fetch(process.env.REACT_APP_mainAPIurl + '/dorms/' + dorm._id, {
            method: 'DELETE',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: dorm._id })
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
        const res = await fetch(process.env.REACT_APP_mainAPIurl + '/dorms/' + dorm._id, {
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
        setName(dorm.name)
        setAddress(dorm.address)
    }, [dorm]);

    const [putError, setPutError] = useState('');
    const [putSuccess, setPutSuccess] = useState('');
    if (dorm === undefined)
        return <></>
    return (
        <div className="jumbotron jumbotron-fluid dataContainer text-center shadow-sm">
            <h5>{dorm.name}</h5>
            <form onSubmit={Update} className="form my-2 my-lg-0 justify-content-center">
                <div className="container">
                    <div className="form-group d-flex flex-column align-items-baseline">
                        <label className="label default-label pl-2">Ime</label>
                        <input className="form-control" type="text" name="name" placeholder="ime" aria-label="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group d-flex flex-column align-items-baseline">
                        <label className="label default-label pl-2">Naslov</label>
                        <input className="form-control" type="text" name="address" placeholder="Naslov" aria-label="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-success" type="submit" >Spremeni</button>
                    </div>
                </div>

            </form>
            <form onSubmit={Delete}>
                <button className="btn btn-danger" type="submit" >Izbriši</button>
            </form>
            {putError === "" ? "" : <div className="alert alert-danger mt-3" role="alert">{putError}</div>}
            {putSuccess === "" ? "" : <div className="alert alert-success mt-3" role="alert">{putSuccess}</div>}
        </div>
    )
}
export default DormUpdateFrame;
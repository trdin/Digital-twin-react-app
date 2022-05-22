import { useState, useEffect } from 'react';
import WorkFrame from '../components/frames/WorkFrame';
import Map from '../components/Map';



function StudentWork() {

    const [work, setWork] = useState([]);
    const [search, setSearch] = useState('');
    const [distance, setDiscance] = useState('');
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const [payFrom, setPayFrom] = useState('');
    const [payTo, setPayTo] = useState('');
    const [searchError, setSearchError] = useState('');


    const getLocation = function () {
        navigator.geolocation.getCurrentPosition(function (position) {
            setLongitude(position.coords.longitude)
            setLatitude(position.coords.latitude)
        });
    }
    getLocation();

    async function clearParams() {
        setSearch("")
        setDiscance("");
        setPayFrom("");
        setPayTo("");
        setSearchError("");
        const res = await fetch(process.env.REACT_APP_mainAPIurl + "/studentWork");
        const data = await res.json();
        setWork(data);
    }



    useEffect(function () {
        const getWork = async function () {
            const res = await fetch(process.env.REACT_APP_mainAPIurl + "/studentWork");
            const data = await res.json();
            setWork(data);
        }
        getWork();
    }, []);

    async function Search(e) {
        e.preventDefault();

        getLocation();

        if (isNaN(distance) && distance !== "") {
            setSearchError("Distance must be a number")
        } else if (isNaN(payFrom) && payFrom !== "") {
            setSearchError("pay from must be a number")
        } else if (isNaN(payTo) && payTo !== "") {
            setSearchError("pay to must be a number")
        } else {
            const res = await fetch(process.env.REACT_APP_mainAPIurl + "/studentWork/search", {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    search: search,
                    latitude: latitude,
                    longitude: longitude,
                    distance: distance,
                    payFrom: payFrom,
                    payTo: payTo
                })
            }).catch(errror => { console.error(errror); });
            const data = await res.json();
            if (data[0] !== undefined) {
                setWork(data);
            } else {
                setWork([]);
            }
            setSearchError("")
        }
    }


    return (
        <>
            <Map work={work} userLocation={[latitude, longitude]} className={"shadow"} />

            <div className="container">
                <div className="jumbotron jumbotron-fluid dataContainer text-center shadow-sm">
                    <div className="container">
                        <form onSubmit={Search} className="form-inline my-2 my-lg-0">
                            <div className="form-group">
                                <input className="form-control mr-sm-2 mb-2" type="search" name="search" placeholder="Search by type" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                            </div>
                            <div className="form-group">
                                {
                                    longitude === 0 && latitude === 0 ?
                                        <input className="form-control mr-sm-2 mb-2" type="search" name="location" placeholder="Enable location" aria-label="Enable location" disabled />
                                        :
                                        <input className="form-control mr-sm-2 mb-2" type="search" name="location" placeholder="Input distance" aria-label="Search" value={distance} onChange={(e) => { setDiscance(e.target.value) }} />

                                }
                            </div>
                            <div className="form-group">
                                <input className="form-control mr-sm-2 mb-2" type="search" name="search" placeholder="Pay neto from" aria-label="Search" value={payFrom} onChange={(e) => setPayFrom(e.target.value)} />
                            </div><div className="form-group">
                                <input className="form-control mr-sm-2 mb-2" type="search" name="search" placeholder="Pay neto to" aria-label="Search" value={payTo} onChange={(e) => setPayTo(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-success mb-2" type="submit" >Search by tag</button>
                            </div>
                        </form>
                        <button className="btn btn-danger mt-2" onClick={clearParams}>Clear Parameters</button>
                        {searchError !== "" ?
                            <div className="alert alert-danger mt-3" role="alert">
                                {searchError}
                            </div>
                            : ""
                        }
                    </div>
                </div>
                <div className="row">
                    {work.map(workEl => (<WorkFrame work={workEl} key={workEl._id}></WorkFrame>))}
                </div>
            </div>
        </>
    )

}
export default StudentWork;


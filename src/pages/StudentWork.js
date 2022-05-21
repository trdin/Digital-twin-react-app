import { useState, useEffect } from 'react';
import WorkFrame from '../components/workFrame';


function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

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
        // console.log(longitude)
        navigator.geolocation.getCurrentPosition(function (position) {
            setLongitude(position.coords.longitude)
            // console.log(longitude)
            setLatitude(position.coords.latitude)
        });
    }
    getLocation();



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

        if (isNaN(distance) && distance != "") {
            setSearchError("Distance must be a number")
        } else if (isNaN(payFrom) && payFrom != "") {
            setSearchError("pay from must be a number")
        } else if (isNaN(payTo) && payTo != "") {
            setSearchError("pay to must be a number")
        } else {
            const res = await fetch('http://localhost:3000/studentWork/search', {
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
            if (data != undefined) {
                setWork(data);
            }
            setSearchError("")
        }
    }


    return (
        <div className="container">

            <div className="jumbotron jumbotron-fluid workContainer text-center shadow-sm">
                <div className="container">
                    <form onSubmit={Search} className="form-inline my-2 my-lg-0">
                        <div className="form-group">
                            <input className="form-control mr-sm-2" type="search" name="search" placeholder="Search by type" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                        <div className="form-group">
                            {
                                longitude == 0 && latitude == 0 ?
                                    <input className="form-control mr-sm-2" type="search" name="location" placeholder="Enable location" aria-label="Enable location" disabled />
                                    :
                                    <input className="form-control mr-sm-2" type="search" name="location" placeholder="Input distance" aria-label="Search" value={distance} onChange={(e) => { setDiscance(e.target.value) }} />

                            }
                        </div>
                        <div className="form-group">
                            <input className="form-control mr-sm-2" type="search" name="search" placeholder="Pay neto from" aria-label="Search" value={payFrom} onChange={(e) => setPayFrom(e.target.value)} />
                        </div><div className="form-group">
                            <input className="form-control mr-sm-2" type="search" name="search" placeholder="Pay neto to" aria-label="Search" value={payTo} onChange={(e) => setPayTo(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-success my-2 my-sm-0" type="submit" >Search by tag</button>
                        </div>
                    </form>
                    {searchError != "" ?
                        <div className="alert alert-danger mt-3" role="alert">
                            {searchError}
                        </div>
                        : ""
                    }


                </div>


            </div>
        </>
    )


}
export default StudentWork;


import { useState, useEffect } from 'react';
import BarFrame from '../components/BarFrame';


function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

function Bars() {

    const [bars, setBars] = useState([]);
    const [search, setSearch] = useState('');
    const [distance, setDiscance] = useState('');
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const [payFrom, setPayFrom] = useState('');
    const [payTo, setPayTo] = useState('');
    const [searchError, setSearchError] = useState('');


    const getLocation = function () {
        console.log(longitude)
        navigator.geolocation.getCurrentPosition(function (position) {
            setLongitude(position.coords.longitude)
            console.log(longitude)
            setLatitude(position.coords.latitude)
        });
    }
    getLocation();



    useEffect(function () {
        const getBars = async function () {
            const res = await fetch("http://localhost:3000/bars");
            const data = await res.json();
            setBars(data);
        }
        getBars();
    }, []);

    async function Search(e) {
        e.preventDefault();

        getLocation();

        if (isNaN(distance) && distance != "") {
            setSearchError("Distance must be a number")
        }
        else {
            const res = await fetch('http://localhost:3000/bars/search', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    search: search,
                    latitude: latitude,
                    longitude: longitude,
                    distance: distance
                })
            }).catch(errror => { console.error(errror); });
            const data = await res.json();
            if (data != undefined) {
                setBars(data);
            }
            setSearchError("")
        }
    }


    return (
        <div className="container">

            <div className="jumbotron jumbotron-fluid dataContainer text-center shadow-sm">
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
                            <button className="btn btn-success my-2 my-sm-0" type="submit" >Search by Name</button>
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
            <div className="row">
                {bars.map(bar => (<BarFrame bar={bar} key={bar._id}></BarFrame>))}
            </div>


        </div>
    )


}
export default Bars;


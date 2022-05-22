
import { useState, useEffect } from 'react';
import WifiFrame from '../components/frames/WifiFrame';
import Map from '../components/Map';


// function getWindowDimensions() {
//     const { innerWidth: width, innerHeight: height } = window;
//     return {
//         width,
//         height
//     };
// }

function Wifis() {

    const [wifis, setWifis] = useState([]);
    const [search, setSearch] = useState('');
    const [distance, setDiscance] = useState('');
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);
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
        setSearchError("");
        const res = await fetch(process.env.REACT_APP_mainAPIurl + "/wifi/wifiSpeeds");
        const data = await res.json();
        setWifis(data);
    }




    useEffect(function () {
        const getWifis = async function () {
            const res = await fetch(process.env.REACT_APP_mainAPIurl + "/wifi/wifiSpeeds");
            const data = await res.json();
            setWifis(data);
        }
        getWifis();
    }, []);

    async function Search(e) {
        e.preventDefault();

        getLocation();

        if (isNaN(distance) && distance !== "") {
            setSearchError("Distance must be a number")
        }
        else {
            const res = await fetch(process.env.REACT_APP_mainAPIurl + '/wifi/search', {
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
            if (data[0] !== undefined) {
                setWifis(data);
            } else {
                setWifis([]);
            }
            setSearchError("")
        }
    }
    return (<>
        <Map wifis={wifis} userLocation={[latitude, longitude]} className={"shadow"} />

        <div className="container">
1
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
                            <button className="btn btn-success mb-2" type="submit" >Search by Name</button>
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
                {wifis.map(wifi => (<WifiFrame wifi={wifi} key={wifi.wifi._id}></WifiFrame>))}
            </div>


        </div>
    </>)


}
export default Wifis;


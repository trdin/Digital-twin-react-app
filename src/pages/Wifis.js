
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../userContext';
import WifiFrame from '../components/frames/WifiFrame';
const Syncfetch = require('sync-fetch')


function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

function Wifis() {
    const userContext = useContext(UserContext);

    const [wifis, setWifis] = useState([]);
    const [search, setSearch] = useState('');
    const [distance, setDiscance] = useState('');
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const [searchError, setSearchError] = useState('');
    //user adding name form
    const [wifiAddName, setWifiAddName] = useState('');
    const [wifiStreet, setWifiStreet] = useState('');
    const [wifiStreetNumber, setWifiStreetNumber] = useState('');
    const [wifiPassword, setWifiPassword] = useState('')
    const [wifiAddMessage, setWifiAddMessage] = useState('');
    //refresh
    const [refresh, setRefresh] = useState(0)

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
        const res = await fetch("http://localhost:3000/wifi/wifiSpeeds");
        const data = await res.json();
        setWifis(data);
    }

    useEffect(function () {
        const getWifis = async function () {
            const res = await fetch("http://localhost:3000/wifi/wifiSpeeds");
            const data = await res.json();
            setWifis(data);
        }
        getWifis();
    }, [refresh]);

    async function Search(e) {
        e.preventDefault();
        getLocation();
        if (isNaN(distance) && distance != "") {
            setSearchError("Distance must be a number")
        }
        else {
            const res = await fetch('http://localhost:3000/wifi/search', {
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
            if (data[0] != undefined) {
                setWifis(data);
            } else {
                setWifis([]);
            }
            setSearchError("")
        }
    }

    const addWifi = async function (e) {
        e.preventDefault()

        var address = (wifiStreet + " " + wifiStreetNumber).toLowerCase()
        var array = address.split(' ')
        var street = ""
        var prevAtribute = undefined

        array.forEach(attribute => {
            if (attribute.length == 1 && isNaN(attribute) && !isNaN(prevAtribute)) { // checking if adreess has a number and ther is a space before it i should be 8a but is 8 a
                street = street.slice(0, -1)//removing the +
                street += attribute + "+"
            } else {
                street += attribute + "+"
            }
            prevAtribute = attribute
        })
        var data = Syncfetch(`http://oskardolenc.eu:591/search.php?street=${street}&city=maribor&format=jsonv2`)

        var location = data.json()
        if (location == undefined || location.length == 0) {
            setWifiAddMessage({
                err: true,
                message: "Adress not valid"
            })
        } else {

            const res = await fetch('http://localhost:3000/wifi/userCreate', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: wifiAddName,
                    password: wifiPassword,
                    latitude: location[0].lat,
                    longitude: location[0].lon,
                    dataSeriesTitle: 'userAddWifi'
                })
            }).catch(errror => { console.error(errror); });
            const data = await res.json();
            if (data._id != undefined) {
                setWifiAddMessage({
                    err: false,
                    message: "Added wifi successfuly"
                })
                setRefresh(oldKey => oldKey + 1)
                setWifiStreet("")
                setWifiStreetNumber("")
                setWifiAddName("")
                setWifiPassword("")

            } else {
                setWifiAddMessage({
                    err: true,
                    message: "Unable to add Wifi"
                })
            }
        }
    }

    return (
        <div className="container">

            <div className="jumbotron jumbotron-fluid dataContainer text-center shadow-sm">
                <div className="container">
                    <form onSubmit={Search} className="form-inline my-2 my-lg-0">
                        <div className="form-group">
                            <input className="form-control mr-sm-2 mb-2" type="search" name="search" placeholder="Search by type" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                        <div className="form-group">
                            {
                                longitude == 0 && latitude == 0 ?
                                    <input className="form-control mr-sm-2 mb-2" type="search" name="location" placeholder="Enable location" aria-label="Enable location" disabled />
                                    :
                                    <input className="form-control mr-sm-2 mb-2" type="search" name="location" placeholder="Input distance" aria-label="Search" value={distance} onChange={(e) => { setDiscance(e.target.value) }} />

                            }
                        </div>
                        <div className="form-group">
                            <button className="btn btn-success mb-2" type="submit" >Search</button>
                        </div>
                    </form>
                    <button className="btn btn-danger mt-2" onClick={clearParams}>Clear Parameters</button>
                    {searchError != "" ?
                        <div className="alert alert-danger mt-3" role="alert">
                            {searchError}
                        </div>
                        : ""
                    }
                    {userContext.user ?
                        <>
                            <div>
                                <button className="btn darkBackground text-white mb-3 mt-3" type="button" data-toggle="collapse" data-target='#addWifi' aria-expanded="false" aria-controls="collapseExample">
                                    Dodaj novi Wifi
                                </button>
                            </div>

                            <div className="collapse" id="addWifi">
                                <div className="container pt-3">
                                    <h2>Dodaj novo wifi tocko</h2>
                                    <form onSubmit={addWifi} className="form my-2 my-lg-0 justify-content-center pl-md-5 pr-md-5 ">
                                        <div className="form-group">
                                            <label>Naslov kjer se nahaja wifi</label>
                                            <div className="row">
                                                <div className=" col-sm-12 col-md-8">
                                                    <input className="form-control mb-2" type="search" name="address" placeholder="input street" aria-label="Search" value={wifiStreet} onChange={(e) => setWifiStreet(e.target.value)} required />
                                                </div>
                                                <div className="col-sm-12 col-md-4">
                                                    <input className="form-control mr-sm-2 mb-2" type="search" name="address" placeholder="input street number" aria-label="Search" value={wifiStreetNumber} onChange={(e) => setWifiStreetNumber(e.target.value)} required />
                                                </div>
                                            </div>

                                        </div>
                                        <div className="form-group">
                                            <label>Ime wifija</label>
                                            <input className="form-control mr-sm-2 mb-2" type="search" name="name" placeholder="input name" aria-label="Search" value={wifiAddName} onChange={(e) => setWifiAddName(e.target.value)} required />
                                        </div>
                                        <div className="form-group">
                                            <label className="">Če ima wifi geslo dodaj še geslo</label>
                                            <input className="form-control mr-sm-2 mb-2" type="search" name="password" placeholder="Search by password" aria-label="Search" value={wifiPassword} onChange={(e) => setWifiPassword(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <button className="btn btn-success mb-2" type="submit" >Dodaj Wifi</button>
                                        </div>
                                    </form>

                                    {wifiAddMessage != '' ?
                                        <div className="pr-5 pl-5">
                                            <div className={`alert alert-${wifiAddMessage.err ? "danger" : "success"}`} role="alert">
                                                {wifiAddMessage.message}
                                            </div>
                                        </div>
                                        : ''}

                                </div>
                            </div>
                        </>
                        : ""}

                </div>
            </div>
            <div className="row">
                {wifis.map(wifi => (<WifiFrame wifi={wifi} key={wifi._id}></WifiFrame>))}
            </div>
        </div >
    )


}
export default Wifis;


import { useState, useEffect } from 'react';
import RestaurantFrame from '../components/frames/RestaurantFrame';
import Map from '../components/Map';

function Restaurants() {

    const [restaurants, setRestaurants] = useState([]);
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
        const res = await fetch(process.env.REACT_APP_mainAPIurl + "/restaurants");
        const data = await res.json();
        setRestaurants(data);
    }




    useEffect(function () {
        const getRestaurants = async function () {
            const res = await fetch(process.env.REACT_APP_mainAPIurl + "/restaurants");
            const data = await res.json();
            setRestaurants(data);
        }
        getRestaurants();
    }, []);

    async function Search(e) {
        e.preventDefault();

        getLocation();

        if (isNaN(distance) && distance !== "") {
            setSearchError("Distance must be a number")
        }
        else {
            const res = await fetch(process.env.REACT_APP_mainAPIurl + '/restaurants/search', {
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
                setRestaurants(data);
            } else {
                setRestaurants([]);
            }

            setSearchError("")
        }
    }


    return (<>
        <Map restaurants={restaurants} userLocation={[latitude, longitude]} className={"shadow"} />

        <div className="container">

            <div className="jumbotron jumbotron-fluid dataContainer text-center shadow-sm">
                <div className="container">
                    <form onSubmit={Search} className="form-inline my-2 my-lg-0">
                        <div className="form-group">
                            <input className="form-control mr-sm-2 mb-2" type="search" name="search" placeholder="Išči po imenu" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                        <div className="form-group">
                            {
                                longitude === 0 && latitude === 0 ?
                                    <input className="form-control mr-sm-2 mb-2" type="number" name="location" placeholder="Omogočite lokacijo" aria-label="Omogočite lokacijo" disabled />
                                    :
                                    <input className="form-control mr-sm-2 mb-2" type="number" name="location" placeholder="Vnesite razdaljo" aria-label="Search" value={distance} onChange={(e) => { setDiscance(e.target.value) }} />

                            }
                        </div>
                        <div className="form-group">
                            <button className="btn btn-success mb-2" type="submit" >Išči</button>
                        </div>
                    </form>
                    <button className="btn btn-danger mt-2" onClick={clearParams}>Počisti parametre</button>
                    {searchError !== "" ?
                        <div className="alert alert-danger mt-3" role="alert">
                            {searchError}
                        </div>
                        : ""
                    }


                </div>
            </div>
            <div className="row">
                {restaurants.map(restaurant => (<RestaurantFrame restaurant={restaurant} key={restaurant._id}></RestaurantFrame>))}
            </div>


        </div>
    </>)


}
export default Restaurants;
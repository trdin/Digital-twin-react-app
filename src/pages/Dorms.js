import { useState, useEffect } from 'react';
import DormFrame from '../components/frames/dorms/DormFrame';
import Map from '../components/Map';


function Dorms() {

    const [dorms, setDorms] = useState([]);
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const getLocation = function () {
        navigator.geolocation.getCurrentPosition(function (position) {
            setLongitude(position.coords.longitude)
            setLatitude(position.coords.latitude)
        });
    }
    getLocation();
    useEffect(function () {
        const getDorms = async function () {
            const res = await fetch(process.env.REACT_APP_mainAPIurl + "/dorms");
            const data = await res.json();
            setDorms(data);
        }
        getDorms();
    }, []);

    return (
        <>
            <Map dorms={dorms} userLocation={[latitude, longitude]} className={"shadow mb-4"} />
            <div className="container">
                <div className="row">
                    {dorms.map(dorm => (<DormFrame dorm={dorm} key={dorm._id}/>))}
                </div>
            </div>
        </>
    )
}
export default Dorms;


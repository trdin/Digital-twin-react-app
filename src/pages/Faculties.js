import { useState, useEffect } from 'react';
import FacultyFrame from '../components/frames/faculties/FacultyFrame';
import Map from '../components/Map';


function Dorms() {

    const [faculties, setFaculties] = useState([]);
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
        const getFaculties = async function () {
            const res = await fetch(process.env.REACT_APP_mainAPIurl + "/faculties");
            const data = await res.json();
            setFaculties(data);
        }
        getFaculties();
    }, []);

    return (
        <>
            <Map bars={faculties} userLocation={[latitude, longitude]} className={"shadow mb-4"} />
            <div className="container">
                <div className="row">
                    {faculties.map(faculty => (<FacultyFrame faculty={faculty} key={faculty._id}/>))}
                </div>
            </div>
        </>
    )
}
export default Dorms;


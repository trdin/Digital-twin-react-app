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
    const [searchParam, setSearchParam] = useState('');
    const [distance, setDiscance] = useState('');
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);

    const getLocation = function () {
        console.log(longitude)
        navigator.geolocation.getCurrentPosition(function (position) {
            setLongitude(position.coords.longitude)
            console.log(longitude)
            setLatitude(position.coords.latitude)
        });
    }
    const HandleChangeSearch = function (e) { setSearch(e.target.value) }
    getLocation();



    useEffect(function () {
        const getWork = async function () {
            const res = await fetch("http://localhost:3000/studentWork");
            const data = await res.json();
            setWork(data);
        }
        getWork();
    }, []);

    async function Search(e) {
        e.preventDefault();

        getLocation();

        const res = await fetch('http://localhost:3000/studentWork/search', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                search: search,
                latitude: latitude,
                longitude: longitude,
                distance: distance,
            })
        }).catch(errror => { console.error(errror); });
        const data = await res.json();
        setWork(data);
        //setSearchParam(search);
    }


    return (
        <div className="container">

            <div className="jumbotron jumbotron-fluid workContainer text-center shadow-sm">
                <div className="container">
                    <form onSubmit={Search} className="form-inline my-2 my-lg-0">
                        <div className="form-group">
                            <input className="form-control mr-sm-2" type="search" name="search" placeholder="Search by type" aria-label="Search" value={search} onChange={HandleChangeSearch} />
                        </div>
                        <div className="form-group">
                            {
                                longitude == 0 && latitude == 0 ?
                                    <input className="form-control mr-sm-2" type="search" name="search by type" placeholder="Enable location" aria-label="Enable location" disabled />
                                    :
                                    <input className="form-control mr-sm-2" type="search" name="search by type" placeholder="Input distance" aria-label="Search" value={distance} onChange={(e) => { setDiscance(e.target.value) }} />

                            }
                        </div>
                        <div className="form-group">
                            <button className="btn btn-success my-2 my-sm-0" type="submit" >Search by tag</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="row">
                {work.map(workEl => (<WorkFrame work={workEl} key={workEl._id}></WorkFrame>))}
            </div>


        </div>
    )


}
export default StudentWork;


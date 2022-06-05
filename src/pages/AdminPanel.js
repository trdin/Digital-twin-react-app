import { useContext, useState, useEffect } from 'react';
import Jumbotron from "../components/Jumbotron";
import DataSeriesSettingsFrame from "../components/frames/DataSeriesSettingsFrame";
import FacultyUpdateFrame from "../components/frames/faculties/FacultyUpdateFrame";
import FacultyAddFrame from "../components/frames/faculties/FacultyAddFrame";
import DormUpdateFrame from "../components/frames/dorms/DormUpdateFrame";
import DormAddFrame from "../components/frames/dorms/DormAddFrame";
import { UserContext } from "../userContext";
import { Navigate } from 'react-router-dom';



function AdminPanel() {
    const userContext = useContext(UserContext);
    const [dataSeries, setDataSeries] = useState([]);
    const [faculties, setFaculties] = useState([]);
    const [dorms, setDorms] = useState([]);
    useEffect(function () {
        const getDataSeries = async function () {
            const res = await fetch(process.env.REACT_APP_mainAPIurl + "/dataSeries");
            const data = await res.json();
            setDataSeries(data);
        }
        getDataSeries()
        const getFaculties = async function () {
            const res = await fetch(process.env.REACT_APP_mainAPIurl + "/faculties");
            const data = await res.json();
            setFaculties(data);
        }
        getFaculties()
        const getDorms = async function () {
            const res = await fetch(process.env.REACT_APP_mainAPIurl + "/dorms");
            const data = await res.json();
            setDorms(data);
        }
        getDorms()
    }, []);

    return (<>
        {!userContext.user ? <Navigate replace to="/login" /> :
            <>{userContext.user.admin ? "" : <Navigate replace to="/login" />
            }</>}
        <Jumbotron title="Data Series nastavitve"
            bgcolor="greenBackground"
            textColor="black"
            textOrient="center"
        />
        <div className="container">
            <div className="row">
                {dataSeries.map(element => (<DataSeriesSettingsFrame dataSeries={element} key={element._id} />))}
            </div>
        </div>
        <Jumbotron title="Fakultete & Študentski domovi"
            bgcolor="darkBackground"
            textColor="white"
            textOrient="center"
        />
        <div className="container">
            <div className="row">
                <div className="col">
                    <FacultyAddFrame />
                </div>
                <div className="col">
                    <DormAddFrame />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    {faculties.map(element => (<FacultyUpdateFrame faculty={element} key={element._id} />))}
                </div>
                <div className="col">
                    {dorms.map(element => (<DormUpdateFrame dorm={element} key={element._id} />))}
                </div>
            </div>

        </div>
    </>
    )
}
export default AdminPanel;
import { useContext, useState, useEffect } from 'react';
import Jumbotron from "../components/Jumbotron";
import DataSeriesSettingsFrame from "../components/frames/DataSeriesSettingsFrame";
import { UserContext } from "../userContext";
import { Navigate } from 'react-router-dom';



function Home() {
    const [dataSeries, setDataSeries] = useState([]);
    const [isAdmin, setIsAdmin] = useState({});
    const userContext = useContext(UserContext);

    useEffect(function () {
        const getDataSeries = async function () {
            const res = await fetch(process.env.REACT_APP_mainAPIurl + "/dataSeries");
            const data = await res.json();
            setDataSeries(data);
        }
        getDataSeries()

        const getIsAdmin = async function () {
            const res = await fetch(process.env.REACT_APP_mainAPIurl + "/users/profile", { credentials: "include" });
            const data = await res.json();
            setIsAdmin(data.admin);
        }
        getIsAdmin();
    }, []);
    return (<>
        {!userContext.user ? <Navigate replace to="/login" /> :
            <>{isAdmin ? "" : <Navigate replace to="/login" />
            }</>}
        <Jumbotron title="DataSeries settings"
            bgcolor="greenBackground"
            textColor="white"
            textOrient="center"
        />
        <div className="container">
            <div className="row">
                {dataSeries.map(element => (<DataSeriesSettingsFrame dataSeries={element} key={element._id} />))}
            </div>
        </div>


    </>


    )
}
export default Home;
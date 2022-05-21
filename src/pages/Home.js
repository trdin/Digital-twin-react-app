import { Link } from "react-router-dom";
import Jumbotron from "../components/Jumbotron";

function Home() {

    const getLocation = function () {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
        });
    }
    getLocation();

    return (<>

        <div className="container" style={{ border: '2px solid red', "height": "20rem" }}></div>


        <Jumbotron title="Iščeš študentsko Delo !?"
            description="Za tvoje delo poskrbimo mi. Pri nas najdeš najširšo ponudbo študentskega dela iz različnih virov."
            promp="Poglej si vse ponudbe študentskega dela"
            url="/studentWork"
            bgcolor="greenBackground"
            textColor="white"
            textOrient="left"
        ></Jumbotron>
        <Jumbotron title="Hello, world!"
            description="This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information."
            promp="It uses utility classes for typography and spacing to space content out within the larger container."
            url="/"
            bgcolor="darkBackground"
            textColor="white"
            textOrient="right"
        ></Jumbotron>
        <Jumbotron title="Hello, world!"
            description="This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information."
            promp="It uses utility classes for typography and spacing to space content out within the larger container."
            url="/"
            bgcolor="lightBackground"
            textColor="dark"
            textOrient="left"
        ></Jumbotron>


    </>


    )
}
export default Home;
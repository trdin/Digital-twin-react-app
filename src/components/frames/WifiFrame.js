import { Link } from "react-router-dom";

function WifiFrame(props) {
    var wifi = props.wifi.wifi;
    var speed = props.wifi.speed;
    return (
        <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="jumbotron jumbotron-fluid dataContainer text-center shadow-sm">
                <div className="container">
                    <h5 className="text-center" style={{ height: 50 }}>{wifi.name}</h5>
                    {speed === undefined ? <h6>No measurements</h6> :
                        <h6>Speed: {speed} Mbps</h6>
                    }
                    <Link to={'/wifiDetails/' + wifi._id} className="btn darkBackground text-white w-75 mx-auto">Details and Measurements</Link>
                </div>
            </div>
        </div>
    )
}
export default WifiFrame;
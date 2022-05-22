function WifiFrame(props) {
    var wifi = props.wifi.wifi;
    var speed = props.wifi.speed;
    return (
        <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="jumbotron jumbotron-fluid dataContainer text-center shadow-sm">
                <div className="container">
                    <h5 className="text-center" style={{ height: 50 }}>{wifi.name}</h5>
                    <h6>{wifi.address}</h6>
                    {speed === undefined ? <h6>No measurements</h6> :
                        <h6>Speed: {speed} Mbps</h6>
                    }
                </div>
            </div>
        </div>
    )
}
export default WifiFrame;
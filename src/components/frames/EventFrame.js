
function EventFrame(props) {
    var event = props.event;
    var start = Date.parse(event.start)
    return (
        <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="jumbotron jumbotron-fluid dataContainer text-center shadow-sm">
                <div className="container">
                    <h5 className="text-center" style={{ height: 50 }}>{event.name}</h5>
                    <h6>{event.address}</h6>
                    <h6>start date: {event.start}</h6>
                    <h6>end date: {event.finish}</h6>

                </div>
            </div>
        </div>
    )
}
export default EventFrame;
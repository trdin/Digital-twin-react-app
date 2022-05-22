
function EventFrame(props) {
    var event = props.event;
    // var start = Date.parse(event.start)
    var start = Intl.DateTimeFormat('sl-si', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(Date.parse(event.start))
    var finish = Intl.DateTimeFormat('sl-si', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(Date.parse(event.finish))
    return (
        <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="jumbotron jumbotron-fluid dataContainer text-center shadow-sm">
                <div className="container">
                    <h5 className="text-center" style={{ height: 50 }}>{event.name}</h5>
                    <h6>{event.address}</h6>
                    <h6>start date: {start}</h6>
                    <h6>end date: {finish}</h6>

                </div>
            </div>
        </div>
    )
}
export default EventFrame;
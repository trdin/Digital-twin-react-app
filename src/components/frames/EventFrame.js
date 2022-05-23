
function EventFrame(props) {
    var event = props.event;
    // var start = Date.parse(event.start)
    var start = Intl.DateTimeFormat('sl-si', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(Date.parse(event.start))
    return (
        <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="jumbotron jumbotron-fluid dataContainer text-center shadow-sm">
                <div className="container">
                    <h5 className="text-center" style={{ height: 50 }}>{event.title}</h5>
                    <h6>{event.content}</h6>
                    <h6>{event.address}</h6>
                    <h6>start date: {start}</h6>
                    <a className="btn btn-primary btn-lg" href={event.url} role="button">Read more</a>

                </div>
            </div>
        </div>
    )
}
export default EventFrame;
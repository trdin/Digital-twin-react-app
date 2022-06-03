
function EventFrame(props) {
    var event = props.event;
    // var start = Date.parse(event.start)
    var start = Intl.DateTimeFormat('sl-si', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(Date.parse(event.start))
    return (
        <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="jumbotron jumbotron-fluid dataContainer text-center shadow-sm">
                <div className="container">
                    <h5 className="text-center" style={{ height: 70 }}>{event.title}</h5>
                    
                    <h6 className="mb-3" style={{ height: 30 }}>{event.address}</h6>
                    <h6 style={{ height: 30 }}>start date: {start}</h6>
                    <button className="btn darkBackground text-white mb-3 mt-3" type="button" data-toggle="collapse" data-target={`#collapseExample${event._id}`} aria-expanded="false" aria-controls="collapseExample">
                        Podrobnosti
                    </button>
                    <div className="collapse" id={`collapseExample${event._id}`}>
                        <h6 className="mb-3">{event.content}</h6>

                        <a className="btn darkBackground text-white" href={event.url} role="button">Preberi več</a>

                    </div>

                </div>
            </div>
        </div>
    )
}
export default EventFrame;
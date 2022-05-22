function DormFrame(props) {
    var dorm = props.dorm;

    if (dorm === undefined)
        return <></>
    return (
        <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="jumbotron jumbotron-fluid dataContainer text-center shadow-sm">
                <div className="container">
                    <h5 className="text-center" style={{ height: 50 }}>{dorm.name}</h5>
                    <h6>{dorm.address}</h6>
                </div>
            </div>
        </div>
    )
}
export default DormFrame;
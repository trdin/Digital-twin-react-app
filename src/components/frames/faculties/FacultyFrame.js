function FacultyFrame(props) {
    var faculty = props.faculty;

    if (faculty === undefined)
        return <></>
    return (
        <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="jumbotron jumbotron-fluid dataContainer text-center shadow-sm">
                <div className="container">
                    <h5 className="text-center" style={{ height: 50 }}>{faculty.name}</h5>
                    <h6>{faculty.address}</h6>
                </div>
            </div>
        </div>
    )
}
export default FacultyFrame;
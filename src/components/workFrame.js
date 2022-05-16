
function WorkFrame(props) {

    return <>
        <div className="card py-3 h-100">
            <div className="card-body">
                <h5 className="card-title text-center">{props.title}</h5>
                <p className="card-text text-truncate" style={{}}>{props.description}</p>
            </div>
            <Link to={`/product-details/${id}`} className="btn btn-dark w-75 mx-auto">Details</Link>
        </div>
    </>


}
export default WorkFrame;
function Jumbotron(props) {
    console.log(props)
    if (props == undefined) {
        return <></>
    } else {
        return (
            <div className={`jumbotron text-${props.textColor} rounded-0 mb-0 ${props.bgcolor}`}>
                <div className={`container text-${props.textOrient}`}>
                    <h1 className="display-4">{props.title}</h1>
                    <p className="lead">{props.description}</p>
                    <hr className="my-4" />
                    <p>{props.promp}</p>
                    <p className="lead">
                        <a className="btn btn-primary btn-lg" href={props.url} role="button">Learn more</a>
                    </p>
                </div>
            </div>
        )
    }
}
export default Jumbotron;
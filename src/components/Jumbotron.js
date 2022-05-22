function Jumbotron(props) {

    if (props === undefined) {
        return <></>
    } else {
        return (
            <div className={`jumbotron text-${props.textColor} rounded-0 mb-0 ${props.bgcolor} ${props.className}`}>
                <div className={`container text-${props.textOrient}`}>
                    {(props.title === undefined) ? "" :
                        <h1 className="display-4">{props.title}</h1>
                    }
                    {(props.description === undefined) ? "" :

                        <p className="lead">{props.description}</p>
                    }
                    {(props.prompt === undefined && props.url === undefined) ? "" :
                        <hr className="my-4" />
                    }
                    {(props.prompt === undefined) ? "" :
                        <p>{props.prompt}</p>
                    }
                    {(props.url === undefined) ? "" :
                        <p className="lead">
                            <a className="btn btn-primary btn-lg" href={props.url} role="button">Learn more</a>
                        </p>
                    }
                </div>
            </div>
        )
    }
}
export default Jumbotron;
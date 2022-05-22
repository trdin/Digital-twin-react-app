function WorkFrame(props) {
    var work = props.work;
    return (
        <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="jumbotron jumbotron-fluid dataContainer text-center shadow-sm">
                <div className="container">
                    <h5 className="text-center" style={{ height: 50 }}>{work.type}</h5>
                    {work.subType ? <h6>{work.subType}</h6> : ""}
                    {work.payNET !== 0 ? <h6>Urna postavka: {work.payNET}(bruto: {work.payGROSS})</h6> : <h6>Urna postavka po dogovoru</h6>}

                    <button className="btn darkBackground text-white mb-3 mt-3" type="button" data-toggle="collapse" data-target={`#collapseExample${work._id}`} aria-expanded="false" aria-controls="collapseExample">
                        Podrobnosti
                    </button>
                    <div className="collapse" id={`collapseExample${work._id}`}>
                        <p className="card-text">{work.descripction}</p>
                        {work.phone ? <p className="card-text mb-3">{work.phone}</p> : ""}
                        {work.email ? <p className="card-text mb-3">{work.email}</p> : ""}

                        <a href={work.link} className="btn darkBackground text-white w-75 mx-auto">Prijava na Delo</a>

                    </div>
                </div>
            </div>
        </div>
    )


}
export default WorkFrame;
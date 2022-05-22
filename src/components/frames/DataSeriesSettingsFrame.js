import { useState } from 'react';

function BarFrame(props) {
    var dataSeries = props.dataSeries;
    async function Update(e) {
        e.preventDefault();
        setPutSuccess("")
        setPutError("")
        const res = await fetch(process.env.REACT_APP_mainAPIurl + '/dataSeries/' + dataSeries._id, {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                settings: {
                    refresh_rate: refreshRate,
                    priority: priority
                }
            })
        }).catch(errror => { console.error(errror); });
        const data = await res.json();
        if (data[0] !== undefined) {
            setPutError(data)
        } else {
            setPutSuccess("Success")
        }
    }

    const [refreshRate, setRefreshRate] = useState('');
    const [priority, setPriority] = useState('');
    const [putError, setPutError] = useState('');
    const [putSuccess, setPutSuccess] = useState('');

    setRefreshRate(dataSeries.settings.refresh_rate)
    setPriority(dataSeries.settings.priority)

    if (dataSeries === undefined)
        return <></>
    return (
        <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="jumbotron jumbotron-fluid dataContainer text-center shadow-sm">
                <div className="container">
                    <h5 className="text-center" style={{ height: 50 }}>{dataSeries.title}</h5>
                    <form onSubmit={Update} className="form my-2 my-lg-0 justify-content-center">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="form-group d-flex flex-column align-items-baseline flex">
                                    <label className="label default-label pl-2">Priotity</label>
                                    <input className="form-control" type="text" name="priority" placeholder="priority" aria-label="priority" value={priority} onChange={(e) => setPriority(e.target.value)} />
                                </div>
                                <div className="form-group d-flex flex-column align-items-baseline flex">
                                    <label className="label default-label pl-2">Refresh rate</label>
                                    <input className="form-control" type="text" name="refreshRate" placeholder="refresh rate" aria-label="refreshRate" value={refreshRate} onChange={(e) => setRefreshRate(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-success mt-2" type="submit" >Submit change</button>
                        </div>
                    </form>
                    {putError === "" ? "" :
                        <div className="alert alert-danger mt-3" role="alert">
                            {putError}
                        </div>}
                    {putSuccess === "" ? "" :
                        <div className="alert alert-success mt-3" role="alert">
                            {putSuccess}
                        </div>

                    }
                </div>
            </div>
        </div>
    )
}
export default BarFrame;
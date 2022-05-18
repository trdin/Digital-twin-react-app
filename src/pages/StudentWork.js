import { useState, useEffect } from 'react';
import WorkFrame from '../components/workFrame';

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

function StudentWork() {

    const [work, setWork] = useState([]);



    useEffect(function () {
        const getWork = async function () {
            const res = await fetch("http://localhost:3000/studentWork");
            const data = await res.json();
            console.log(data)
            setWork(data);
        }
        getWork();
    }, []);


    return (
        <div className="container">
            <div className="row">
                {work.map(workEl => (<WorkFrame work={workEl} key={workEl._id}></WorkFrame>))}
            </div>


        </div>
    )


}
export default StudentWork;
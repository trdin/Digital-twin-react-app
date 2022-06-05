import * as d3 from "d3";
import { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { UserContext } from '../userContext';
import { Link } from "react-router-dom";
async function createGraph(wifi) {
    // read from csv and format variables "2022-05-22T00:37:58.483Z"
    //let data = await d3.csv('https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv')
    var data = wifi
    let parseTime = d3.timeParse("%Y-%m-%dT%H:%M:%S.%LZ");
    data.forEach((d) => {
        d.date = parseTime(d.time);
        d.value = parseFloat(d.speed);
    });
    var element = d3.select('.graph').node();
    var width_tmp = element.getBoundingClientRect().width;
    // set the dimensions and margins of the graph
    var margin = { top: 20, right: 20, bottom: 50, left: 70 },
        width = width_tmp - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
    // append the svg object to the body of the page
    d3.select('.graph').html("")
    var svg = d3.select(".graph").append("svg")
        .attr("width", "100%")
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},     ${margin.top})`);
    // Add X axis and Y axis
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);
    x.domain(d3.extent(data, (d) => { return d.date; }));
    y.domain([0, d3.max(data, (d) => { return d.value; })]);
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));
    svg.append("g")
        .call(d3.axisLeft(y));

    // add the Line
    var valueLine = d3.line()
        .x((d) => { return x(d.date); })
        .y((d) => { return y(d.value); });
    svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", valueLine)
}


function WifiDetails() {
    const userContext = useContext(UserContext);
    let { id } = useParams();
    const [wifi, setWifi] = useState([]);
    const [speed, setSpeed] = useState([]);
    // const [wifiSpeeds, setWifiSpeeds] = useState([]);
    // const [longitude, setLongitude] = useState(0);
    // const [latitude, setLatitude] = useState(0);
    const [speedMessage, setSpeedMessage] = useState('')
    // const [speedMeasurement, setSpeedMeasurement] = useState(0)
    //refresh
    const [refresh, setRefresh] = useState(0)

    const saveSpeedMeasurement = async function (speed) {
        const res = await fetch(process.env.REACT_APP_mainAPIurl + "/wifiSpeed", {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                wifi: id,
                speed: speed,
                dataSeriesTitle: "wifiSpeeds"
            })
        });
        const data = await res.json();
        if (data === undefined || data.error !== undefined) {
            console.error(data || "Unknown error");
        }
    }

    const MeasureConnectionSpeed = () => {
        var imageAddr = "https://upload.wikimedia.org/wikipedia/commons/2/2d/Snake_River_%285mb%29.jpg";
        var downloadSize = 5245329;
        var startTime, endTime;
        var download = new Image();
        startTime = (new Date()).getTime();
        var cacheBuster = "?nnn=" + startTime;
        download.src = imageAddr + cacheBuster;
        download.onload = function () {
            endTime = (new Date()).getTime();
            showResults();
        }
        download.onerror = function (err, msg) {
            setSpeedMessage("Invalid image, or error downloading");
        }
        function showResults() {
            var duration = (endTime - startTime) / 1000;
            var bitsLoaded = downloadSize * 8;
            var speedBps = (bitsLoaded / duration).toFixed(2);
            var speedKbps = (speedBps / 1024).toFixed(2);
            var speedMbps = (speedKbps / 1024).toFixed(2);
            // setSpeedMeasurement(speedMbps)
            setSpeedMessage(
                "Your connection speed is: " +
                speedMbps + " Mbps \n"
            );
            saveSpeedMeasurement(speedMbps);
            setRefresh(oldKey => oldKey + 1)
        }
    }

    //TODO get wifi speed by id
    useEffect(function () {
        const getWifi = async function () {
            const res = await fetch(process.env.REACT_APP_mainAPIurl + "/wifi/" + id);
            const data = await res.json();
            setWifi(data.wifi);
            setSpeed(data.speed)
            // setWifiSpeeds(data.wifiSpeeds)
            if (data.wifiSpeeds.length !== 0) {
                createGraph(data.wifiSpeeds);
            }
        }
        getWifi();
    }, [refresh, id]);

    return (
        <div className="container">

            <div className="jumbotron jumbotron-fluid dataContainer text-center shadow-sm">
                <div className="container">
                    <h2>{wifi.name}</h2>
                    {speed === undefined ? <h4>Ni meritev</h4> :
                        <h4>Speed: {speed} Mbps</h4>
                    }
                    {userContext.user ?
                        <>
                            <button onClick={MeasureConnectionSpeed} className="btn darkBackground text-white w-75 mx-auto"> Izmeri Internetno hitrost</button>
                            {speedMessage !== "" ? <h6 className="mt-2">{speedMessage}</h6> : ""}
                        </>
                        : ""}
                    <div className="graph" ></div>

                    <Link className="btn darkBackground text-white mx-auto mt-3" to='/wifis'>Nazaj na Wifi-je</Link>
                </div>
            </div>
        </div>
    )


}
export default WifiDetails;


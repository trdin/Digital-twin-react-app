import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

//icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import workIcon from '../img/icons/work.png';
import barIcon from '../img/icons/java.png';
import dormIcon from '../img/icons/dorm.png';
import eventsIcon from '../img/icons/event.png';
import facultiesIcon from '../img/icons/faculty.png';
import restaurantsIcon from '../img/icons/restaurant.png';
import wifiIcon from '../img/icons/wifi.png';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [13, 41],
    popupAnchor: [0, -39]
});
const customIconSize = [25 , 25]
const customIconAnchor = [15,15]
const customIconPopupAnchor = [0,-20]
let WorkIcon = L.icon({
    iconUrl: workIcon,
    iconSize: customIconSize,
    iconAnchor: customIconAnchor,
    popupAnchor: customIconPopupAnchor
});
let BarsIcon = L.icon({
    iconUrl: barIcon,
    iconSize: customIconSize,
    iconAnchor: customIconAnchor,
    popupAnchor: customIconPopupAnchor
});
let DormsIcon = L.icon({
    iconUrl: dormIcon,
    iconSize: customIconSize,
    iconAnchor: customIconAnchor,
    popupAnchor: customIconPopupAnchor
});
let EventsIcon = L.icon({
    iconUrl: eventsIcon,
    iconSize: customIconSize,
    iconAnchor: customIconAnchor,
    popupAnchor: customIconPopupAnchor
});
let FacultiesIcon = L.icon({
    iconUrl: facultiesIcon,
    iconSize: customIconSize,
    iconAnchor: customIconAnchor,
    popupAnchor: customIconPopupAnchor
});
let RestaurantsIcon = L.icon({
    iconUrl: restaurantsIcon,
    iconSize: customIconSize,
    iconAnchor: customIconAnchor,
    popupAnchor: customIconPopupAnchor
});
let WifisIcon = L.icon({ 
    iconUrl: wifiIcon,
    iconSize: customIconSize,
    iconAnchor: customIconAnchor,
    popupAnchor: customIconPopupAnchor
});
L.Marker.prototype.options.icon = DefaultIcon;
function Map(props) {
    const initViewPos = [46.558, 15.647]
    const initZoom = 15
    if (props === undefined) {
        console.log("Props undefined, drawing empty map");
        return <>
            <MapContainer className={props.className} center={initViewPos} zoom={initZoom} scrollWheelZoom={true} attributionControl={false}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </>
    } else {
        return (
            <MapContainer className={props.className} center={initViewPos} zoom={initZoom} scrollWheelZoom={true} attributionControl={false}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {props.userLocation === undefined ? "" :
                    <Marker position={props.userLocation} icon={DefaultIcon} key={"userLocation"}>
                        <Popup>
                            UserLocation
                        </Popup>
                    </Marker>}

                {/* StudentWork */
                    (props.work === undefined) ? "" :
                        props.work.map(({ location, type, company }, index) => (
                            (location.coordinates[0] === 0 && location.coordinates[1] === 0) ? "" : (
                                <Marker position={location.coordinates} icon={WorkIcon} key={"work_marker" + index}>
                                    <Popup>
                                        {type} <br /> {company}
                                    </Popup>
                                </Marker>
                            )
                        ))}

                {/* Bars */
                    (props.bars === undefined) ? "" :
                        props.bars.map(({ location, name }, index) => (
                            (location.coordinates[0] === 0 && location.coordinates[1] === 0) ? "" : (
                                <Marker position={location.coordinates} icon={BarsIcon} key={"bars_marker" + index}>
                                    <Popup>
                                        {name}
                                    </Popup>
                                </Marker>
                            )
                        ))}

                {/* Dorms */
                    (props.dorms === undefined) ? "" :
                        props.dorms.map(({ location, name }, index) => (
                            (location.coordinates[0] === 0 && location.coordinates[1] === 0) ? "" : (
                                <Marker position={location.coordinates} icon={DormsIcon} key={"dorms_marker" + index}>
                                    <Popup>
                                        {name}
                                    </Popup>
                                </Marker>
                            )
                        ))}

                {/* Events */
                    (props.events === undefined) ? "" :
                        props.events.map(({ location, title }, index) => (
                            (location.coordinates[0] === 0 && location.coordinates[1] === 0) ? "" : (
                                <Marker position={location.coordinates} icon={EventsIcon} key={"events_marker" + index}>
                                    <Popup>
                                        {title}
                                    </Popup>
                                </Marker>
                            )
                        ))}

                {/* Faculties */
                    (props.faculties === undefined) ? "" :
                        props.faculties.map(({ location, name }, index) => (
                            (location.coordinates[0] === 0 && location.coordinates[1] === 0) ? "" : (
                                <Marker position={location.coordinates} icon={FacultiesIcon} key={"faculties_marker" + index}>
                                    <Popup>
                                        {name}
                                    </Popup>
                                </Marker>
                            )
                        ))}

                {/* Restaurants */
                    (props.restaurants === undefined) ? "" :
                        props.restaurants.map(({ location, name }, index) => (
                            (location.coordinates[0] === 0 && location.coordinates[1] === 0) ? "" : (
                                <Marker position={location.coordinates} icon={RestaurantsIcon} key={"restaurants_marker" + index}>
                                    <Popup>
                                        {name}
                                    </Popup>
                                </Marker>
                            )
                        ))}

                {/* Wi-fis */
                    (props.wifis === undefined) ? "" :
                        props.wifis.map(({ wifi }, index) => (
                            (wifi.location.coordinates[0] === 0 && wifi.location.coordinates[1] === 0) ? "" : (
                                <Marker position={wifi.location.coordinates} icon={WifisIcon} key={"wifis_marker" + index}>
                                    <Popup>
                                        {wifi.name}
                                    </Popup>
                                </Marker>
                            )
                        ))}

            </MapContainer>
        )
    }
}
export default Map;
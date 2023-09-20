import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import axios from 'axios';


function MapsComponent() {
    const [locationsArray, setlocationArray] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedState, setSelectedState] = useState("");

    const containerStyle = {
        width: '100%',
        height: '400px'
    };

    const center = {
        lat: -25.2744, lng: 133.7751
    };

    //Connection to API endpoint
    useEffect(() => {
        axios.get('http://localhost:5066/api/WeatherStation')
            .then(response => {
                setlocationArray(response.data);
            })
            .catch(er => {
                console.log(er);
            });
    }, []);

    //Filter for State on weather stations
    // Extract a list of unique states from the locationsArray for the dropdown
    const uniqueStates = Array.from(new Set(locationsArray.map(location => location.state)));

    return (
        <div>
            <div style={{ marginBottom: '10px', padding: '5px 50px' }}>
                <label>Filter by State: </label>
                <select className="form-select" value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
                    <option value="">All States</option>
                    {uniqueStates.map(state => (
                        <option key={state} value={state}>
                            {state}
                        </option>
                    ))}
                </select>
            </div>

            <LoadScript
                googleMapsApiKey={process.env.REACT_APP_GOOGLEAPIKEY}
            >
                <GoogleMap
                    mapContainerClassName='map-container'
                    draggable={true}
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={6}
                >
                    {locationsArray.filter(location => !selectedState || location.state === selectedState).map(location => (
                        <Marker
                            key={location.id}
                            position={{
                                lat: parseFloat(location.latitude),
                                lng: parseFloat(location.longitude),
                            }}
                            title={location.wsName}
                            onClick={() => setSelectedLocation(location)}
                        />
                    ))}

                    {selectedLocation && (
                        <InfoWindow
                            position={{
                                lat: parseFloat(selectedLocation.latitude),
                                lng: parseFloat(selectedLocation.longitude),
                            }}
                            onCloseClick={() => setSelectedLocation(null)}
                        >
                            <div>
                                <h4>{selectedLocation.wsName}</h4>
                                <p>Site: {selectedLocation.site}</p>
                                <p>Portfolio: {selectedLocation.portfolio}</p>
                                <p>State: {selectedLocation.state}</p>
                                <p>Latest Reading time: {selectedLocation.timestamp}</p>
                                <p>LongName: {selectedLocation.variables[0].longName}</p>
                                <p>Unit: {selectedLocation.variables[0].unit}</p>
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            </LoadScript>
        </div>
    );
}

export default MapsComponent;

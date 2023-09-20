import { useState, useMemo, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";


const locationsArray = [
    {
      "id": "1",
      "wsName": "Cohuna North",
      "site": "Cohuna Solar Farm",
      "portfolio": "Enel Green Power",
      "state": "VIC",
      "latitude": "-35.882762",
      "longitude": "144.217208"
    },
    {
      "id": "2",
      "wsName": "Bungala 1 West",
      "site": "Bungala 1 Solar Farm",
      "portfolio": "Enel Green Power",
      "state": "SA",
      "latitude": "-32.430536",
      "longitude": "137.846245"
    },
    {
      "id": "3",
      "wsName": "Bungala 2 East",
      "site": "Bungala 2 Solar Farm",
      "portfolio": "Enel Green Power",
      "state": "SA",
      "latitude": "-32.405243",
      "longitude": "137.833565"
    },
    {
      "id": "4",
      "wsName": "Parkes North",
      "site": "Parkes Solar Farm",
      "portfolio": "NEOEN",
      "state": "NSW",
      "latitude": "-33.104181",
      "longitude": "148.07779"
    },
    {
      "id": "5",
      "wsName": "Parkes South",
      "site": "Parkes Solar Farm",
      "portfolio": "NEOEN",
      "state": "NSW",
      "latitude": "-33.123945",
      "longitude": "148.077615"
    },
    {
      "id": "6",
      "wsName": "Parkes East",
      "site": "Parkes Solar Farm",
      "portfolio": "NEOEN",
      "state": "NSW",
      "latitude": "33.110485",
      "longitude": "148.101728"
    },
    {
      "id": "7",
      "wsName": "Coopers Gap Mast ",
      "site": "Coopers Gap Wind Farm",
      "portfolio": "AGL",
      "state": "QLD",
      "latitude": "-26.744933",
      "longitude": "151.46473"
    },
    {
      "id": "8",
      "wsName": "Bulgana Mast",
      "site": "Bulgana Green Power Hub",
      "portfolio": "NEOEN",
      "state": "VIC",
      "latitude": "-37.062474",
      "longitude": "142.950079"
    },
    {
      "id": "9",
      "wsName": "Childers West",
      "site": "Childers Solar Farm",
      "portfolio": "Atmos",
      "state": "QLD",
      "latitude": "-25.304253",
      "longitude": "152.407882"
    },
    {
      "id": "10",
      "wsName": "Darlington MS",
      "site": "Darlington Solar Farm",
      "portfolio": "Edify",
      "state": "NSW",
      "latitude": "-34.647727",
      "longitude": "146.063079"
    }
  ];

function Map() {
   

    const center = useMemo(() => ({lat: -37.8102, lng: 144.9628  }), []);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedState, setSelectedState] = useState("");
  
    return (
        <div>
          <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
            <option value="">Select a State</option>
            {/* Get unique states for the dropdown */}
            {[...new Set(locationsArray.map(location => location.state))].map(state => (
                <option key={state} value={state}>{state}</option>
            ))}
          </select>
  
          <GoogleMap zoom={6} center={center} mapContainerClassName="map-container">
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
                  </div>
                </InfoWindow>
            )}
          </GoogleMap>
        </div>
    );
  }

  export default Map;
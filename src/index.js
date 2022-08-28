import React, { useState, useEffect, useMemo } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import { getShouldCangeAnchorLocation, getNewLocation } from "./helper";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div className="container">
      <Map />
    </div>
  </React.StrictMode>
);

const containerStyle = {
  width: "100%",
  height: "100vh",
};
const initialCenter = {
  lat: -33,
  lng: 151,
};

const initialZoom = 13;

function TextBox({ position }) {
  return (
    <div className="text-box">
      <span>{`lat: ${position?.lat}`}</span>
      <span>{`lon: ${position?.lng}`}</span>
    </div>
  );
}

function Map() {
  const [mapCenter, setMeapCenterer] = useState(initialCenter);
  const [anchorLocation, setAnchorLocation] = useState(initialCenter);
  const [currentLocation, setCurrentLocation] = useState(initialCenter);
  const [shouldReCenter, setShouldReCenter] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      const newLocation = getNewLocation(currentLocation);
      const shouldCangeAnchorLocation = getShouldCangeAnchorLocation(
        anchorLocation,
        currentLocation
      );
      setCurrentLocation(newLocation);
      if (shouldReCenter) {
        setMeapCenterer(newLocation);
      }

      if (shouldCangeAnchorLocation) {
        setAnchorLocation(currentLocation);
        setShouldReCenter(true);
        setMeapCenterer(newLocation);
      }
    }, 500);
  }, [currentLocation, anchorLocation]);

  const memoMarker = useMemo(() => {
    return <MarkerF position={anchorLocation} />;
  }, [anchorLocation]);

  return (
    <LoadScript googleMapsApiKey={""}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={initialZoom}
        onDragStart={() => {
          setShouldReCenter(false);
        }}
      >
        {memoMarker}
      </GoogleMap>
      <TextBox position={currentLocation} />
    </LoadScript>
  );
}

export default React.memo(Map);

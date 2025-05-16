import React from "react";
import { Country } from "../types/Country";

// all leaflet imports
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; //visuals for leaflet
// You can find documentation here https://react-leaflet.js.org/
import L from "leaflet";
import ErrorBoundary from "./ErrorBoundary";
//the L is so I can get the leaflet icon for the marker

type CountryMapProps = {
  country: Country;
  //single country object from the array of countries
};

const CountryMaps: React.FC<CountryMapProps> = ({ country }) => {
  const icon = new L.Icon({
    iconUrl: require("leaflet/dist/images/marker-icon.png"), //icon location
    iconSize: [25, 41], //icon ize
    iconAnchor: [12, 41], //what part of the icon touches the location of the whole icon (so the point)
    popupAnchor: [1, -34], // where the popup opens when you click the icon
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"), //the shadow for the icon so it looks 3d
    shadowSize: [41, 41], //shadow size
  });
  //This was all bc the leaflet marker icon did not natively work for me - you can also use a different/custom icon

  return (
    // section it out for screen readers and just good readability in general
    <section aria-label={`Map of ${country.name.common}`}>
      {/* These are all leaflet items and you  can find them in the documentation.  a leaflet map is rendered in the container. the scrollwheelzoom is set to false here to prevent scrolling. center and zoom are both visual so it tells us where we will see the map. */}
      <ErrorBoundary>
        {/* in case there is an error with the map */}
        <MapContainer
          center={country.latlng}
          zoom={5}
          scrollWheelZoom={false}
          className="map-container"
          aria-hidden="false" // the map is not hidden
        >
          {/* Thia shows the maps background tiles using open street map */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* shows where the marker will exactly touch the map */}
          <Marker position={country.latlng} icon={icon}>
            <Popup>
              <strong>{country.name.common}</strong>
              <br />
              Capital: {country.capital?.[0] ?? "N/A"}
            </Popup>
          </Marker>
        </MapContainer>
      </ErrorBoundary>
    </section>
  );
};

export default CountryMaps;

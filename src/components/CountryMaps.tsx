import React from "react";
import { Country } from "../types/Country";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
// You can find documentation here https://react-leaflet.js.org/
//the L is so I can get the leaflet icon for the marker

type CountryMapProps = {
  country: Country;
  //single country object from the array of countries
};

const CountryMaps: React.FC<CountryMapProps> = ({ country }) => {
  const icon = new L.Icon({
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    shadowSize: [41, 41],
  });
  //This was all bc the leaflet marker icon did not natively work for me - you can also use a different/custom icon

  return (
    <MapContainer
      center={country.latlng}
      zoom={5}
      scrollWheelZoom={false}
      className="map-container"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={country.latlng} icon={icon}>
        <Popup>
          The name of this country is {country.name.common} and the capital is{" "}
          {country.capital}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default CountryMaps;

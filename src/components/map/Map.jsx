import './map.scss'
import React from "react";
import GoogleMapReact from "google-map-react";
import Mark from "./Mark";

// implementation of this function is needed for codesandbox example to work
// you can remove it otherwise
const distanceToMouse = (pt, mp) => {
  if (pt && mp) {
    // return distance between the marker and mouse pointer
    return Math.sqrt(
      (pt.x - mp.x) * (pt.x - mp.x) + (pt.y - mp.y) * (pt.y - mp.y)
    );
  }
};

const points = [
  { id: 1, title: "Trần Quốc Vượng", lat: 21.0348857, lng:105.783295,},
  { id: 2, title: "VMO", lat: 21.0299931, lng: 105.779489 },
  { id: 3, title: "FPT", lat: 21.0269141, lng: 105.7865089 }
];

 function Map() {
  return (
    <div className="Map">
      <GoogleMapReact
        bootstrapURLKeys={{
          // remove the key if you want to fork
          key: "AIzaSyCdCixcDCa1nkboYu9kKgW-3SjG84BlkJI",
          language: "en",
          region: "Vn"
        }}
        defaultCenter={{ lat: 21.0299931, lng: 105.783295 }}
        defaultZoom={15}
        distanceToMouse={distanceToMouse}
      >
        {points.map(({ lat, lng, id, title }) => {
          return (
            <Mark key={id} lat={lat} lng={lng} text={id} tooltip={title} />
          );
        })}
      </GoogleMapReact>
    </div>
  );
}
export default Map

import React from 'react';

import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';

export default function MapPage() {

  return (

    <div className='container'>

      <h1>Map test</h1>

      <MapContainer center={[31.94, 34.89]} zoom={7} scrollWheelZoom={true}>

      <Marker key={"12"} position={[30.1564, 34.8057]} />

        <Marker key={"11"} position={[32.1564, 34.8057]} >

          {/* popup - יציג בלחיצה */}

          <Popup>
          <button onclick = {() => {alert
            ("microsoft")}}>
              Microsoft </button>
          </Popup>

        </Marker>

        <Marker key={"22"} position={[32.103553905824256, 35.20688199707208]} >

          {/* tooltip - יציג במעבר עכבר */}

          <Tooltip direction='top' >

            אונבירסטת אריאל

          </Tooltip>

        </Marker>

        <TileLayer

          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'

        />

      </MapContainer>

    </div>

  )

}


// page 31 on מדריך REACT HOOKS

// delete cache on node_modules
// npm install react-leaflet leaflet

// marker on map
// https://blog.logrocket.com/react-leaflet-tutorial/

// add on HTML under title

// <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
// integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
// crossorigin="" />


// add to CSS 

// .leaflet-container {
//   width: 100%;
//   height: 60vh;
// }
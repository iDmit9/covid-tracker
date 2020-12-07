import React from 'react'
// import styles from './Map.module.css' //modules with leaflet do not work
import './Map.css'
import {MapContainer, TileLayer} from 'react-leaflet'

function Map() {

   return (
      <div id='map' className='map'> 
         <MapContainer 
            center={[30, 15]}   
            zoom={2}
         >
            <TileLayer
               attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
         </MapContainer>
      </div>
   )
}

export default Map

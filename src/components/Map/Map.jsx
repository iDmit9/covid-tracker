import React from 'react'
// import styles from './Map.module.css' //modules with leaflet do not work
import './Map.css'
import {MapContainer, TileLayer, useMap, Circle, Popup} from 'react-leaflet'

function Map({countries, maxConfirmed}) {

   const looksNormalMaxRadius = 500000 
   let confirmedRatio = 1
   maxConfirmed && (confirmedRatio = Math.round(maxConfirmed / looksNormalMaxRadius))
   
   function SetCenter({newCenter, newZoom}) {
      const map = useMap();
      map.setView(newCenter, newZoom);
      return null;
   }

   const showDataOnMap = (data) => {
      return data.map(country => ( country.lat &&
         <Circle
            key={country.combinedKey}
            center={[country.lat, country.long]}
            fillOpacity={0.4}
            color="#CC1034"
            fillColor="#CC1034"
            radius={
               country.confirmed / confirmedRatio
            }
         >
            <Popup>
               <div className='info-container'>
                  <div className="info-name">{country.combinedKey}</div>
                  <div className="info-confirmed">
                     Confirmed cases: {country.confirmed}
                  </div>
               </div>
            </Popup>
         </Circle>
      ))
   }
   
   return (
      <div className='map'> 
         <MapContainer 
            center={[30, 15]}   
            zoom={3}
         >
            {/* <SetCenter newCenter={center} newZoom={zoom}/> */}
            <TileLayer
               attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />            
            {showDataOnMap(countries)}
         </MapContainer>
      </div>
   )
}

export default Map

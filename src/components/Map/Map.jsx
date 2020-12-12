import React from 'react'
// import styles from './Map.module.css' //modules with leaflet do not work
import './Map.css'
import {MapContainer, TileLayer, useMap, Circle, Popup} from 'react-leaflet'

function Map({countries, maxConfirmed, center, zoom}) {

   const looksNormalMaxRadius = 200
   // maxConfirmed && (looksNormalMaxRadius = Math.round(maxConfirmed) / someRatio)
   
   function SetCenter({newCenter, newZoom}) {
      const map = useMap();
      map.setView(newCenter, newZoom);
      return null;
   }

   const showDataOnMap = (data) => {
      console.log('showDataOnMap',data)
      return data.map(country => ( country.countryInfo.lat &&
         <Circle
            key={country.country}
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            color="#CC1034"
            fillColor="#CC1034"
            radius={
               Math.sqrt(country.cases) * looksNormalMaxRadius
            }
         >
            <Popup>
               <div className='info-container'>
                  <div
                     className="info-flag"
                     style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
                  ></div>
                  <div className="info-name">{country.country}</div>
                  <div className="info-confirmed">
                     Confirmed cases: {country.cases}
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
            <SetCenter newCenter={center} newZoom={zoom}/>
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

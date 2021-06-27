import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/News.css';
import { GoogleMap, useJsApiLoader, HeatmapLayer } from '@react-google-maps/api';
import useScript from './hooks/useScript';
import { json, states } from './heatmap/json'
import { loadOptions } from '@babel/core';
const containerStyle = {
  width: '1400px',
  height: '600px'
};

const center = {
  lat: 39.065170, lng: -76.974440
};





function Heatmap() {
  console.log(json);
  console.log(states);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDiFegaJoawEr0EH6x92TP7y9pzLObonxI"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, []);


  function heatMapData(type) {
    let listOfLatLng = [];
    if(type=='protests') {
      for(const item of states) {
        listOfLatLng.push({location: new window.google.maps.LatLng(item['latitude'], item['longitude']), weight: json[item['state']]['protests']/100})
    }
   } else {
      for(const item of states) {
        listOfLatLng.push({location: new window.google.maps.LatLng(item['latitude'], item['longitude']), weight: json[item['state']]['fatalities']/100})
    }
    }
    
    return listOfLatLng;
}

  let data = heatMapData('protests');


  return isLoaded ? (
    <div className="App">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          <></>
        </GoogleMap>

        <HeatmapLayer>

        </HeatmapLayer>


      

    </div>

    
) : <></>
}

export default Heatmap;
//https://kit.fontawesome.com/6564562c61.js
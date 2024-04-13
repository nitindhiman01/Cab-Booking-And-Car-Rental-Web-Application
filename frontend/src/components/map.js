import React, { useState } from 'react';
import ReactMapGL, {GeolocateControl, Marker } from 'react-map-gl';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import "../stylesheets/mapbox.css";

const Map = (props) => {
  // const [newPlace, setNewPlace] = useState([0,0]);
  const [userLocation, setUserLocation] = useState({});
  const [viewPort, setViewPort] = useState({
    latitude: 26.6448,
    longitude: 77.217,
    zoom: 6,
  });

  // function handleClick(e){
  //   const cordinates = e.lngLat;

  //   const newCordinates = Object.keys(cordinates).map((item, i) => cordinates[item]);

  //   setNewPlace([newCordinates[0], newCordinates[1]]);
  // }

  return (
    <div className='map-box'>
        <ReactMapGL
            initialViewState={{...viewPort}}
            mapboxAccessToken='pk.eyJ1Ijoibml0aW5kaGltYW4iLCJhIjoiY2x1NDA3Y2R2MTlwaDJrcXM1NnliNTZ5aSJ9.lGvVeEvnZksL2DCWLSbAug'
            mapStyle='mapbox://styles/mapbox/streets-v11'
            onViewportChange={(viewPort) => setViewPort(viewPort)}
            
            // onClick={handleClick}
        >
          <GeolocateControl
            positionOptions={{enableHighAccuracy: true}}
            showUserLocation={true}
            auto={true}
            trackUserLocation={true}
            onGeolocate={(PositionOptions) => {
              setUserLocation({
                ...userLocation,
                latitude: PositionOptions["coords"].latitude,
                longitude: PositionOptions["coords"].longitude,
              });
            }}
          />
          {/* <Marker
            {...viewPort}
          ></Marker>

          {newPlace && (
            <>
              <Marker
                latitude={newPlace[1]}
                longitude={newPlace[0]}
                offsetLeft={-3.5 * viewPort.zoom}
                offsetTop={-7 * viewPort.zoom}
              >
              </Marker>
            </>
          )} */}
          <Marker latitude={props.lati} longitude={props.lngi}></Marker>
          <Marker latitude={props.destLati} longitude={props.destLngi}></Marker>
        </ReactMapGL>
    </div>
  )
}

export default Map
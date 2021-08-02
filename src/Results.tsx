import React, { useState } from 'react';
import amphibian from './amphibian-chameleon-2.png'
import './App.css';
import { useLocation } from 'react-router-dom';
import { createApi } from "unsplash-js";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';


function Results() {


  const [selectedPic, setSelectedPic] = useState({
    alt_description: "", urls: { full: "" },
    user: { name: "", location: "" }, links: { download_location: "" }
  });
  const [showDetail, setShowDetail] = useState(false);
  const location = useLocation();

  const containerStyle = {
    width: '400px',
    height: '400px'
  };

  const center = {
    lat: 3.745,
    lng: -38.523
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyANkiGfse4vn08C18ZZkqizbz8OxMKd-7c"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // const bounds = new window.google.maps.LatLngBounds();
    // map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])


  const api = createApi({
    accessKey: "ZNSY0Eh9GhFKeOrkxRQeYWk8105EqJt2c4-ny2Zu6Lo"
  });
  function download() {
    api.photos.trackDownload({ downloadLocation: selectedPic.links.download_location })
      .then(res => console.log(res)).catch(err => console.log(err))
  }


  var pics = location.state as Array<Object>;
  return (
    <div className="card-list">
      {showDetail ?
        (<div className='popup' >
          <div className='popup_inner'>

            <img
              className="card--image"
              alt={selectedPic.alt_description}
              src={selectedPic.urls.full}
              width="60%"
              height="60%"
            ></img>
            <span>{selectedPic.user.name}</span>
            <span>{selectedPic.user.location}</span>
            <button onClick={() => setShowDetail(false)}>close me</button>
            <button onClick={() => download()}>download</button>

            isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
              onLoad={onLoad}
              onUnmount={onUnmount}
              onClick={() => <a href="http://maps.google.com/maps?saddr=New+York&daddr=San+Francisco">Route New York -- San Francisco</a>
              }
            >
              { /* Child components, such as markers, info windows, etc. */}
              <></>
            </GoogleMap>
            ) : <></>
          </div>
        </div>)
        : null}
      {
        pics.map((pic: any, i: any) =>
          <div key={i} className="card" onClick={() => { setSelectedPic(pic); setShowDetail(true); console.log(pic) }}>
            <img
              className="card--image"
              alt={pic.alt_description}
              src={pic.urls.full}
              width="50%"
              height="50%"
            ></img>

          </div>)
      }
    </div >
  );
}

export default Results;

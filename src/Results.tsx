import React, { useState } from 'react';
import downloadIcon from './download-arrow-1.2.png'
import './App.css';
import { useLocation } from 'react-router-dom';
import { createApi } from "unsplash-js";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import Search from './Search';


function Results() {
  const [selectedPic, setSelectedPic] = useState({
    alt_description: "", urls: { full: "" },
    user: { name: "", location: "" }, links: { download_location: "" },
    location: { position: { latitude: 0, longitude: 0 } }
  });
  const [showDetail, setShowDetail] = useState(false);
  const location = useLocation();
  const [map, setMap] = React.useState(null)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyANkiGfse4vn08C18ZZkqizbz8OxMKd-7c"
  })

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
    <div >
      <Search calling='results' />
      <div className="card-list">

        {showDetail ?
          (<div className='popup'>
            <div className='popup-inner'>
              <button onClick={() => setShowDetail(false)}>close me</button>
              <img
                className="card--image"
                alt={selectedPic.alt_description}
                src={selectedPic.urls.full}
                width="100%"

              ></img>
              <div>
                <span className="user">{selectedPic.user.name}</span>
                <button className="download-button" onClick={() => download()}>
                  <img src={downloadIcon} className="amphibian" alt="amphibian" />

                  Download</button>
              </div>
              {isLoaded && selectedPic.location ? (
                <div onClick={() => <a href="http://maps.google.com/maps?saddr=New+York&daddr=San+Francisco">Route New York -- San Francisco</a>
                }>
                  <GoogleMap
                    mapContainerStyle={{
                      width: '100%',
                      height: '400px'
                    }}
                    center={{
                      lat: selectedPic.location.position.latitude,
                      lng: selectedPic.location.position.longitude
                    }}
                    zoom={10}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                  >
                    { /* Child components, such as markers, info windows, etc. */}
                    <></>
                  </GoogleMap></div>
              ) : <></>}
              <span>{selectedPic.user.location}</span>
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
    </div>
  );
}

export default Results;

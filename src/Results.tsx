import React, { useState, useEffect } from 'react';
import downloadIcon from './download-arrow-1.2.svg'
import union from './union.svg'
import './App.css';
import { useLocation } from 'react-router-dom';
import { createApi } from "unsplash-js";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import Search from './Search';
import { useHistory } from 'react-router-dom';
import ReactLoading from 'react-loading';

function Results() {
  const history = useHistory();
  const [selectedPic, setSelectedPic] = useState({
    alt_description: "", urls: { full: "" },
    user: { name: "", location: "", social: { instagram_username: "" }, profile_image: { small: "" } },
    links: { download_location: "" },
    location: { position: { latitude: 0, longitude: 0 } },
  });

  const [loading, setLoading] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const location = useLocation();
  const [map, setMap] = useState(null)
  const [pics, setPics] = useState([] as any)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyANkiGfse4vn08C18ZZkqizbz8OxMKd-7c"
  })

  function search(param: any) {
    var pageNum = currentPage + param;
    var searchObject = location.state as any;
    api.search.getPhotos({ collectionIds: [searchObject.collection], query: searchObject.query, page: pageNum, perPage: 10 }).then((result: any) => {
      setLoading(false);
      if (result.response?.results && result.response.results.length > 0) {
        setPics(result.response.results)
        setTotalPage(result.response.total_pages)
        setCurrentPage(pageNum)
      }
      else history.push("/error")
    })
      .catch(() => {
        history.push("/error")
      });
    setLoading(true);
  }

  useEffect(() => {
    search(0);
  }, [location]);

  const onLoad = React.useCallback(function callback(map) {
    // const bounds = new window.google.maps.LatLngBounds();
    // map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, [])


  const api = createApi({
    accessKey: "ZNSY0Eh9GhFKeOrkxRQeYWk8105EqJt2c4-ny2Zu6Lo"
  });

  function download() {
    api.photos.trackDownload({ downloadLocation: selectedPic.links.download_location })
    //.then(res => console.log(res)).catch(err => console.log(err))
  }

  return (
    <div className="container">
      <Search calling='results' />

      {loading ?
        <div className="loading">
          <ReactLoading type="spinningBubbles" color="Grey" delay={2} height={80} width={80} />
        </div> :
        <div>
          <div className="form">
            <div className="card-list">

              {showDetail ?
                (<div className='popup'>
                  <div className='popup-inner'>
                    <button className="close-button" onClick={() => setShowDetail(false)}>close</button>
                    <img
                      className="card--image"
                      alt={selectedPic.alt_description}
                      src={selectedPic.urls.full}
                      width="100%"
                    ></img>
                    <div className="popup-inner-row">
                      <img
                        className="profile-image"
                        alt={selectedPic.alt_description}
                        src={selectedPic.user.profile_image.small}
                        width="100%"
                      ></img>
                      <div className="user-info">
                        <span className="user-text">{selectedPic.user.name}</span>
                        <span className="social-text">{selectedPic.user.social.instagram_username}</span>
                      </div>
                      <button className="download-button" onClick={() => download()}>
                        <img src={downloadIcon} className="download-icon" alt="downloadIcon" />
                        Download
                      </button>
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
                          <></>
                        </GoogleMap></div>
                    ) : <></>}
                    <div>
                      <img src={union} className="download-icon" alt="downloadIcon" />
                      <span>{selectedPic.user.location}</span>
                    </div>
                  </div>
                </div>)
                : null}
              {
                pics.map((pic: any, i: any) =>
                  <div key={i} className="card" onClick={() => { setSelectedPic(pic); setShowDetail(true); }}>
                    <img
                      className="card--image"
                      alt={pic.alt_description}
                      src={pic.urls.full}
                      width="50%"
                      height="50%"
                    ></img>
                  </div>)
              }
            </div>
          </div>
          <div className="pagination-buttons">
            <button disabled={currentPage === 1} className="pagination-button" onClick={() => search(-1)}>
              <span>Back</span>
            </button>
            {/* <span className="social-text">{currentPage} of {totalPage}</span> */}
            <button disabled={currentPage < totalPage} className="pagination-button" onClick={() => search(1)}>
              <span>Next</span>
            </button>
          </div>
        </div>
      }
    </div>
  );
}

export default Results;

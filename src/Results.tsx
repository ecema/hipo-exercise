import React, { useState } from 'react';
import amphibian from './amphibian-chameleon-2.png'
import './App.css';
import { useLocation } from 'react-router-dom';


function Results() {
  const [selectedPic, setSelectedPic] = useState({ alt_description: "", urls: { full: "" }, user: { name: "" ,location:""} });
  const [showDetail, setShowDetail] = useState(false);
  const location = useLocation();

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

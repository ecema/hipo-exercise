import React, { useEffect, useState } from 'react';
import amphibian from './amphibian-chameleon-2.png'
import './App.css';
import { createApi } from "unsplash-js";
import { useHistory } from 'react-router-dom';

function Home() {
  const history = useHistory();
  const [query, setQuery] = useState("");
  const [collection, setCollection] = useState("");
  const [collections, setCollections] = useState([{ title: "", id: "" }] as any)
  const api = createApi({
    accessKey: "ZNSY0Eh9GhFKeOrkxRQeYWk8105EqJt2c4-ny2Zu6Lo"
  });

  function search(collection: any) {
    setCollection(collection);
    api.search.getPhotos({ collectionIds: [collection], query: query }).then(result => {
      if (result.response?.results && result.response.results.length > 0)
        history.push({
          pathname: '/results',
          search: '?query=' + query + '?collectionId=' + collection,
          state: result.response?.results 
        })
      else history.push("/error")
    })
      .catch((err) => {
        history.push("/error")
      });
  }

  useEffect(() => {
    api.collections
      .list({ page: 1, perPage: 10 })
      .then(result => {
        setCollections(result.response?.results.map(({ title, id }) => ({ title, id })))
      })
      .catch(() => {
        console.log("something went wrong!");
      });

  }, []);
  return (
    <div className="App">
      <div className="logo">
        <div className="rectangle2">  <img src={amphibian} className="amphibian" alt="amphibian" /> </div>
        <p className="image-search">
          <b>Image</b> Search
        </p>
      </div>
      <div className="location">
        <input className="query" type="text" value={query} onChange={(val: any) => setQuery(val.target.value)} placeholder={"Query"} />
      </div>
      <div className="dropdown">
        <select className="dropdown" value={collection} onChange={(val: any) => { search(val.target.value); }}>
          {collections.map((collection: any, i: any) => (
            <option key={i} value={collection.id}>{collection.title}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Home;

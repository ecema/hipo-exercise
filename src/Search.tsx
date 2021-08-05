import { useEffect, useState } from 'react';
import amphibian from './amphibian.svg'
import './App.css';
import { createApi } from "unsplash-js";
import { useHistory } from 'react-router-dom';

function Search(props: any) {

  const history = useHistory();
  const [query, setQuery] = useState("");
  const [collection, setCollection] = useState("");
  const [collections, setCollections] = useState([{ title: "", id: "" }] as any)
  const api = createApi({
    accessKey: "ZNSY0Eh9GhFKeOrkxRQeYWk8105EqJt2c4-ny2Zu6Lo"
  });
  
  function search() {
    history.push({
      pathname: '/results',
      search: '?query=' + query + '?collectionId=' + collection,
      state: {query: query, collection:collection}
    })
  }

  useEffect(() => {
    const randomPage = Math.floor(Math.random() * 20 + 1)
    api.collections
      .list({ page: randomPage, perPage: 10 })
      .then(result => {
        setCollections(result.response?.results.map(({ title, id }) => ({ title, id })))
      })
      .catch(() => {
        console.log("something went wrong!");
      });
  }, []);

  return (
    <div className={props.calling === 'home' ? "search-page" : "search-bar"}>
      <div className="logo" onClick={() => history.push("/")}>
        <div className="rectangle2">  <img src={amphibian} className="amphibian" alt="amphibian" /> </div>
        {props.calling === 'home' ? <p className="image-search">
          <b>Image</b> Search
        </p> : null}
      </div>

      <div className="location">
        <input className="query" type="text" value={query} onChange={(val: any) => setQuery(val.target.value)} placeholder={"Query"} />
      </div>

      <div className="dropdown">
        <select placeholder="Collection" className="dropdown" value={collection} onChange={(val: any) => { setCollection(val.target.value); }}>
          <option className="options" value=''></option>
          {collections.map((collection: any, i: any) => (
            <option className="options" key={i} value={collection.id}>{collection.title}</option>
          ))}
        </select>
      </div>
      <button className="button" onClick={() => search()}>SEARCH</button>
      {/* <Select
        options={collections.map((i: any) => i.title)}
        placeholder={'Select something'}
        clearable={false}
        style={{
          fontSize: 14,
          color: 'blue',
          width: '400px'
        }}
      /> */}
    </div>
  );
}

export default Search;

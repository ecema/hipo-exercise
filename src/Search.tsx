import { useEffect, useState } from 'react';
import amphibian from './amphibian.svg';
import polygon from './polygon.svg';
import './App.css';
import { createApi } from "unsplash-js";
import { useHistory } from 'react-router-dom';
import Select from 'react-select';

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
      state: { query: query, collection: collection }
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

  function arrowRenderer() {
    return <img src={polygon} className="polygon" alt="polygon" />
  }

  return (
    <div className={props.calling === 'home' ? "search-page" : "search-bar"}>
      <div className="logo" onClick={() => history.push("/")}>
        <div className="rectangle2">  <img src={amphibian} className="amphibian" alt="amphibian" /> </div>
        {props.calling === 'home' ? <p className="image-search">
          <b>Image</b> Search
        </p> : null}
      </div>

      <input className="query" type="text" value={query} onChange={(val: any) => setQuery(val.target.value)} placeholder={"Query"} />
      <Select
        options={collections.map((i: any) => { return { label: i.title, value: i.id } })}
        placeholder={'Collections'}
        className="dropdown"
        arrowRenderer={arrowRenderer}
      />
      {props.calling === 'home' ? <div className="shadow"></div> : null}
      
      <button className="button" onClick={() => search()}>SEARCH</button>

    </div>
  );
}

export default Search;

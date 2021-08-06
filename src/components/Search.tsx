import { useEffect, useState } from 'react';
import amphibian from './../images/amphibian.svg';
import polygon from './../images/polygon.svg';
import './../App.css';
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
        setCollections([{ title: "Blurred/in motion", id: "3582397" },
        { title: "Floral Beauty", id: "17098" },
        { title: "Summer Tones", id: "583479" },
        { title: "International Women's Day", id: "4403603" },
        { title: "Light-Washed Tones", id: "1020268" },
        { title: "Double Exposures", id: "1632080" },
        { title: "Flowers Contained", id: "1988224" },
        { title: "Brands", id: "2351409" },
        { title: "Women Are Amazing", id: "4386752" },
        { title: "Backgrounds / Textures", id: "1368747" }])
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
        onChange={(val: any) => setCollection(val.value)}
      />
      {props.calling === 'home' ? <div className="shadow"></div> : null}
      <button className="button" onClick={() => search()}>SEARCH</button>
    </div>
  );
}

export default Search;

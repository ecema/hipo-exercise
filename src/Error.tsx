import Search from './Search';
import './App.css';
import noFound from './tom-unsplash.jpg'

function Home() {
  return (
    <div className="error-page">
      <Search calling='error' />
      <img src={noFound} className="noFound" alt="noFound" /> 
      <span className="error"> No photo found related to query & category</span>
    </div>
  );
}

export default Home;

import { Switch, Route } from "react-router-dom";

import './App.css';
import Home from './components/Home';
import Results from './components/Results';
import Error from './components/Error';

function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/results" component={Results} />
        <Route path="/error" component={Error} />
      </Switch>
    </main>
  );
}

export default App;

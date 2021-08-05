import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import Home from './Home';
import Results from './Results';
import Error from './Error';

function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/results" component={Results} />
        <Route component={Error} />
      </Switch>
    </main>
  );
}

export default App;

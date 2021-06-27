import React from 'react';
import ReactDOM from 'react-dom'
import { IndexRoute } from 'react-router';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './index.css';
import News from './screens/News';
import Petitions from './screens/Petitions';
import Rooms from './screens/Rooms';
import Detector from './screens/Detector';
import Heatmap from './screens/Heatmap';

import reportWebVitals from './reportWebVitals';
import NavBar from './components/navbar'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <NavBar />
      <Switch>
        <Route path="/" exact component={News} />
        <Route path="/petitions" exact component={Petitions} />
        <Route path="/rooms" exact component={Rooms} />
        <Route path="/detector" exact component={Detector} />
        <Route path="/heatmap" exact component={Heatmap} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/*export default (
  <Route path="/" component={News} />
)*/
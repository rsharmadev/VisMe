import React from 'react';
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './index.css';
import News from './screens/News';
import reportWebVitals from './reportWebVitals';
import Heatmap from './screens/Heatmap';

export default function Index() {
  return (
    <Router>
      <div>
        <header class="header">
            <h1 class="logo"><a href="#">VISME</a></h1>
            <ul>
                <li>
                    <Link to="/">NEWS</Link>
                </li>
                <li>
                    <Link to="/Heatmap">HEATMAP</Link>
                </li>
            </ul>
        </header> 

        <Switch>
          <Route exact path="/">
            <News />
          </Route>
          <Route path="/Heatmap">
            <Heatmap />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
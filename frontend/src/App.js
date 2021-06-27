import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './index.css';
import News from './screens/News';
import Petitions from './screens/Petitions';
import Heatmap from './screens/Heatmap';
import Rooms from './screens/Rooms';
import Detection from './screens/Detection'
import Login from './screens/Login';

export default function Index() {
  return (
    <Router>
      <div>
        <header class="header">
            <h1 class="logo">VISME</h1>
            <ul>
                <li>
                    <Link to="/">NEWS</Link>
                </li>
                <li>
                    <Link to="/Heatmap">HEATMAP</Link>
                </li>
                <li>
                    <Link to="/Petitions">PETITIONS</Link>
                </li>
                <li>
                    <Link to="/Rooms">ROOMS</Link>
                </li>
                <li>
                  <Link to="/Detection">DETECTION</Link>
                </li>
                <li>
                  <Link to="/Login">LOGIN</Link>
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
          <Route path="/Petitions">
            <Petitions />
          </Route>
          <Route path="/Rooms">
            <Rooms />
          </Route>
          <Route path="/Detection">
            <Detection />
          </Route>
          <Route path="/Login">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
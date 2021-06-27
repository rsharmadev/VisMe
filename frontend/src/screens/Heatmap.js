import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/News.css';

function Heatmap() {
  return (
    <div className="App">
      <header class="header">
        <h1 class="logo"><a href="#">VISME</a></h1>
        <ul class="main-nav">
          <li><a href="#">NEWS</a></li>
          <li><a href="#">PETITIONS</a></li>
          <li><a href="#">ROOMS</a></li>
          <li><a href="#">DETECTOR</a></li>
          <li><a href="#">HEATMAP</a></li>
        </ul>
      </header> 
      <i class="fas fa-angle-left"></i>
      <div>
      </div>
    </div>
  );
}

export default Heatmap;
//https://kit.fontawesome.com/6564562c61.js
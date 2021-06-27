import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/News.css';

function Petitions() {
    const [petitionList, setPetitionList] = useState([]);
    fetch("http://127.0.0.1:4000/")
        .then(response => response.json())
        .then(data => setPetitionList(data));
    return (
        <div className="App">
        <i class="fas fa-angle-left"></i>
        <div>
            <p>Hey!</p>
        </div>
        </div>
    );
}

export default Petitions;
//https://kit.fontawesome.com/6564562c61.js
import React, { useState } from 'react';
import { Button, Jumbotron } from 'react-bootstrap';
//import Iframe from 'react-iframe'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/News.css';

function Petitions() {
    const [petitionList, setPetitionList] = useState([{
        "title": "Waiting for petitions...",
        "text": "",
    }]);
    fetch("http://127.0.0.1:4000/")
        .then(response => response.json())
        .then(data => setPetitionList(data));
    console.log(petitionList)
    return (
        <div className="App">
            <i class="fas fa-angle-left"></i>
            <Jumbotron style={{width: "80%", height: "auto", position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
                <h1>{petitionList[0]["title"]}</h1>
                <p>{petitionList[0]["text"]}</p>
            </Jumbotron>
        </div>
    );
}

export default Petitions;
//https://kit.fontawesome.com/6564562c61.js
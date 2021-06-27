import React, { useState, useEffect } from 'react';
import { Button, Jumbotron, Modal } from 'react-bootstrap';
//import Iframe from 'react-iframe'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/News.css';

function Petitions() {
    // Autofill stuff
    const [showProfile, setShowProfile] = useState(false);
    const handleClose = () => setShowProfile(false);
    const handleShow = () => setShowProfile(true);

    const [petitionList, setPetitionList] = useState([{
        "title": "Waiting for petitions...",
        "text": "",
    }]);
    const [petitionIndex, setPetitionIndex] = useState(0)
    const handleSkip = () => setPetitionIndex(petitionIndex+1);

    useEffect(() => {
        fetch("http://127.0.0.1:4000/")
            .then(response => response.json())
            .then(data => setPetitionList(data));
        console.log(petitionList)
    });

    return (
        <div className="App">
            <Button variant="primary" onClick={handleShow}>
                Settings
            </Button>
            <Modal show={showProfile} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Fill Settings</Modal.Title>
                </Modal.Header>
                <label htmlFor="formGroupExampleInput">First Name</label>
                <input
                    type="text"
                    style={{width: "80%", marginLeft: "10%"}}
                    id="firstName"
                />
                <label htmlFor="formGroupExampleInput">Last Name</label>
                <input
                    type="text"
                    style={{width: "80%", marginLeft: "10%"}}
                    id="lastName"
                />
                <label htmlFor="formGroupExampleInput">Email</label>
                <input
                    type="text"
                    style={{width: "80%", marginLeft: "10%"}}
                    id="email"
                    onChange
                />
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <i class="fas fa-angle-left"></i>
            <div>
                <Jumbotron style={{width: "80%", height: "auto", position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
                    <h1>{petitionList[petitionIndex]["title"]}</h1>
                    <p>{petitionList[petitionIndex]["text"]}</p>
                    <div style={{position: 'absolute', left: '50%', transform: 'translate(-50%, 0%)'}}>
                        <Button variant="danger" onClick={handleSkip}>Skip</Button>
                        <Button variant="success" style={{marginLeft: 20}} onClick={handleSkip}>Sign</Button>
                    </div>
                </Jumbotron>
            </div>
        </div>
    );
}

let profile = {
    "firstName": "Matthew",
    "lastName": "Nanas",
    "email": "spazeplayz@gmail.com"
}

export default Petitions;
//https://kit.fontawesome.com/6564562c61.js
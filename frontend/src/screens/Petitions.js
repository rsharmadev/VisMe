import React, { useState, useEffect } from 'react';
import { Button, Jumbotron, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/News.css';
import { getByDisplayValue } from '@testing-library/react';

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
    console.log(petitionIndex);
    console.log(petitionList);
    const handleSkip = () => setPetitionIndex(petitionIndex+1);
    const handleSign = () => {
        let a = firstNames;
        let b = lastNames;
        let c = emails;
        let d = petitionList[petitionIndex]["link"];
        console.log(a,b,c,d);
        const signOptions = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "link": d,
                "firstName": a,
                "lastName": b,
                "email": c,
            })
        }
        fetch("http://127.0.0.1:4000/autofill", signOptions)
    };

    //Autofill info
    const [firstNames, setFirstName] = useState("");
    const [lastNames, setLastName] = useState("");
    const [emails, setEmail] = useState("");
    
    useEffect(() => {
        let test = 0;
        if (test === 0) {
            fetch("http://127.0.0.1:4000/")
                .then(response => response.json())
                .then(data =>  {
                    test = 1
                    setPetitionList(data)
                });
            console.log(petitionList)
        }
    }, []);

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
                    onChange={data => setFirstName(document.getElementById('firstName').value)}
                />
                <label htmlFor="formGroupExampleInput">Last Name</label>
                <input
                    type="text"
                    style={{width: "80%", marginLeft: "10%"}}
                    id="lastName"
                    onChange={data => setLastName(document.getElementById('lastName').value)}
                />
                <label htmlFor="formGroupExampleInput">Email</label>
                <input
                    type="text"
                    style={{width: "80%", marginLeft: "10%"}}
                    id="email"
                    onChange={data => setEmail(document.getElementById('email').value)}
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
                        <Button variant="success" style={{marginLeft: 20}} onClick={handleSign}>Sign</Button>
                    </div>
                </Jumbotron>
            </div>
        </div>
    );
}

export default Petitions;
//https://kit.fontawesome.com/6564562c61.js
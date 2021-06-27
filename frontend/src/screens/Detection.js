import React, { useState, useEffect } from 'react';
import { Button, Jumbotron, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Detection.css';
import { getByDisplayValue } from '@testing-library/react';

function Detection() {
    // Autofill stuff
    const [areaValue, setAreaValue] = useState("");
    const [statusValue, setStatusValue] = useState("Status: Idle")
    const [statusColor, setStatusColor] = useState("black")

    function handleChange(data) {
        try {
            setAreaValue(data.target.value)
            if (areaValue.includes("instagram.com")) {
                setStatusValue("Status: Instagram detected...")
                setStatusColor("orange")
                fetch("http://127.0.0.1:5000/getImages", {
                    "method": "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "url": areaValue,
                    })
                })
                    .then(response => response.text())
                    .then(result => console.log(result))
            } else {
                let req = new XMLHttpRequest();
                req.open("GET", 'http://192.168.1.206:8000/?' + areaValue, true)
                req.onreadystatechange = () => {
                    if (req.readyState !== 4) return;
                    if (req.status !== 200) throw new Error("Http error: " + req.status);
                    let result = JSON.parse(req.responseText);
                    console.log(result);
                }
                setStatusValue("Status: Processing...")
                setStatusColor("blue")
            }  
        } catch (e) {}
    }

    return (
        <div className="App">
            <div>
                <Jumbotron style={{width: "80%", height: "45%", position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
                    <h2 style={{color: statusColor}}>{statusValue}</h2>
                    <textarea value={areaValue} onChange={data => handleChange(data)} style={{width: "100%", height: "100%"}} />
                </Jumbotron>
            </div>
        </div>
    );
}

export default Detection
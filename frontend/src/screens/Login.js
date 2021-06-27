import React, { useState, useEffect } from 'react';
import { Button, Jumbotron, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Detection.css';
import { getByDisplayValue } from '@testing-library/react';

function Login() {
    // Autofill stuff
    const [createNew, setCreateNew] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div className="App" style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: "40%"}}>
            <h1 style={{alignSelf: "center"}}>VisME</h1>
            <div>
                <Form.Control value={username} onChange={data => setUsername(data)} size="lg" type="text" placeholder="Email Address" style={{width: "100%", marginBottom: 30}}/>
                <Form.Control value={password} onChange={data => setPassword(data)} size="lg" type="text" placeholder="Password" style={{width: "100%"}}/>
                <Button variant="primary" type="submit" style={{alignSelf: "center", marginTop: 30}}>
                    Submit
                </Button>
            </div>
        </div>
    )
}

export default Login
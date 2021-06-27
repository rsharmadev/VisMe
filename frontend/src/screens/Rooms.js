import React, { useState, useEffect } from 'react';
import Iframe from 'react-iframe'

function Petitions() {

    return (
        <Iframe url="http://localhost:3000"
        width="450px"
        height="450px"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"
        allow="microphone; camera"
    />
    );
}

export default Petitions;
//https://kit.fontawesome.com/6564562c61.js
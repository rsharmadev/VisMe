import React, { useState, useEffect } from 'react';
import Iframe from 'react-iframe'

function Petitions() {

    return (
        <Iframe url="http://localhost:3000"
        width="100%"
        height="500px"
        id="myId"
        className="myClassname"
        allowFullScreen="true"
        position="relative"
        allow="microphone; camera"
    />
    );
}

export default Petitions;
//https://kit.fontawesome.com/6564562c61.js
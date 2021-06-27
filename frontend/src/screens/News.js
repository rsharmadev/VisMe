import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/News.css';

function News() {
  const [localNews, setLocalNews] = useState([]);
  const [globalNews, setGlobalNews] = useState([]);
  const localOptions = {
    "method": "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      "query": "lgbt",
      "location": "maryland",
    })
  }

  /*const globalOptions = {
    "method": "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      "query": "global activism news",
      "location": "article",
    })
  }*/

  useEffect(() => {
    let test = 0;
    if (test === 0) {
      fetch("http://127.0.0.1:5000/search", localOptions)
        .then(response => response.json())
        .then(data => { 
          test = 1
          setLocalNews(data) 
        })
      /*fetch("http://127.0.0.1:5000/search", globalOptions)
        .then(response => response.json())
        .then(data => { 
          test = 1
          setGlobalNews(data) 
        })*/
    }
  }, []);

  return (
    <div className="App">
      { /*<header class="header">
        <h1 class="logo"><a href="#">VISME</a></h1>
        <ul class="main-nav">
          <li><a href="#">NEWS</a></li>
          <li><a href="#">PETITIONS</a></li>
          <li><a href="#">ROOMS</a></li>
          <li><a href="#">DETECTOR</a></li>
          <li><a href="#">HEATMAP</a></li>
        </ul>
        </header> */}
      <i class="fas fa-angle-left"></i>
      <div>
        {localNews.map((article) => console.log(article))}
      </div>
      <div style={{display: 'flex'}}>
        { /*<h1>Global News</h1>
        <div style={{ overflowX: "scroll", height: "auto", width: "30%" }}>
          { globalNews.map((article) => (
            <Card style={{ width: 'auto', margin: 20, }}>
              <Card.Img variant="top" src={article.image} />
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>{article.text}</Card.Text>
                <Button variant="primary">View</Button>
              </Card.Body>
            </Card>
          )) }
          </div> */}
        <h1>Local News</h1>
        <div style={{ overflowX: "scroll", height: "auto", width: "30%" }}>
          { localNews.map((article) => (
            <Card style={{ width: 'auto', margin: 20, }}>
              <Card.Img variant="top" src={article.image} />
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>{article.text}</Card.Text>
                <Button variant="primary">View</Button>
              </Card.Body>
            </Card>
          )) }
        </div>
      </div>
    </div>
  );
}

export default News;
//https://kit.fontawesome.com/6564562c61.js
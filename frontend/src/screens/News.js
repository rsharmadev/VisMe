import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/News.css';

function News() {
  const [localNews, setLocalNews] = useState([]);
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
  fetch("http://127.0.0.1:5000/search", localOptions)
      .then(response => response.json())
      .then(data => { setLocalNews(data) })
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
      <div style={{ display: "flex", overflowX: "scroll" }}>
        { localNews.map((article) => (
          <Card style={{ width: 'auto', margin: 20, height: "50%" }}>
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
  );
}

export default News;
//https://kit.fontawesome.com/6564562c61.js
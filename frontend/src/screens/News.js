import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    fetch("http://127.0.0.1:5000/search", localOptions)
      .then(response => response.json())
      .then(data => { 
        setLocalNews(data) 
      })
  }, []);

  return (
    <div className="App">
      <i class="fas fa-angle-left"></i>
      <div>
        {localNews.map((article) => console.log(article))}
      </div>
      <div style={{display: 'flex'}}>
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
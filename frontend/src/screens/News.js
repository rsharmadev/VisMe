import logo from './assets/logo.svg';
import './styles/News.css';

function App() {

  const localOptions = {
    "method": "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      "query": "BLM",
      "location": "maryland",
    })
  }
  console.log("hi!")
  fetch("http://127.0.0.1:5000/search", localOptions)
    .then(response => response.json())
    .then(data => { console.log(JSON.parse(data)) })

  return (
    <div className="App">
		<header class="header">
		  <h1 class="logo"><a href="#">VISME</a></h1>
      <ul class="main-nav">
        <li><a href="#">NEWS</a></li>
        <li><a href="#">PETITIONS</a></li>
        <li><a href="#">ROOMS</a></li>
        <li><a href="#">DETECTOR</a></li>
        <li><a href="#">HEATMAP</a></li>
      </ul>
	  </header> 
    <i class="fas fa-angle-left"></i>
    </div>
  );
}

export default App;
//https://kit.fontawesome.com/6564562c61.js
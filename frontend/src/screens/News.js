import React, { useState, useEffect } from 'react';
import { Button, Jumbotron, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/News.css';

function News() {
  const [localNews, setLocalNews] = useState([{'title': "Maryland's Equality Profile - Movement Advancement Project ...", 'link': 'https://www.lgbtmap.org/equality-maps/profile_state/MD', 'text': "See how Maryland compares to the rest of the country on the Snapshot page. Maryland's LGBTQ Laws and Policies. Click on each issue for more information\xa0...", 'image': 'https://www.lgbtmap.org/img/maps/map-populations-policy-overall.png'}, {'title': 'Maryland - HRC - Human Rights Campaign', 'link': 'https://www.hrc.org/in-your-area/maryland', 'text': 'Without comprehensive equal rights legislation at the federal level, LGBTQ people are subject to an inconsistent patchwork of legal protections in their states and\xa0...', 'image': 'https://hrc-prod-requests.s3-us-west-2.amazonaws.com/files/images/blog/_1200x630_crop_center-center_none/HRC-Maryland-LobbyDay-1600x900.jpg?mtime=20200713130827&focal=none&tmtime=20200810130005'}, {'title': 'Resource Guide for LGBTQ+ Youth in Maryland', 'link': 'https://freestate-justice.org/youthguide/', 'text': "FreeState Justice is Maryland's statewide advocacy non-profit that seeks to improve the lives of lesbian, gay, bisexual, transgender, and queer (“LGBTQ”)\xa0...", 'image': 'https://freestate-justice.org/wp-content/uploads/2014/12/youthguidecover.png'}, {'title': 'THE PRIDE CENTER OF MARYLAND | YOUR Resource Center', 'link': 'http://www.pridecentermd.org/', 'text': "A wonderful organization that's serves Baltimore youth and all sorts of people, specifically people of color. They host game nights, provide case management\xa0...\n\u200eDonate · \u200eGet Involved · \u200eCoronavirus Resource Page · \u200eView Calendar", 'image': 'https://s0.wp.com/i/blank.jpg'}, {'title': 'LGBT Equity Center: Home', 'link': 'https://lgbt.umd.edu/', 'text': 'The LGBT Equity Center serves University of Maryland students, staff, faculty, and alumni of all gender identities and sexual orientations.', 'image': 'https://lgbt.umd.edu/sites/lgbt.umd.edu/themes/lgbt/favicon.ico'}, {'title': 'Pride Center of Maryland - CenterLink LGBT Member Center ...', 'link': 'https://www.lgbtcenters.org/LGBTCenters/Center/6627/Pride-Center-of-Maryland', 'text': 'Community Outreach/Education · General Public · Law Enforcement · Physical or Mental Health Providers · School Administrators and/or Teachers\xa0...', 'image': 'https://www.lgbtcenters.org:443/Assets/Images/CenterLogo/Full/pcom_logoweb-600x281-6627.png'}, {'title': 'CenterLink LGBT Community Member Centers in Maryland', 'link': 'https://www.lgbtcenters.org/LGBTCenters/State/17/Maryland', 'text': 'Find 5 Nearest Centers · Filter by State/Province · Filter by Country · Find Center By Name.', 'image': 'https://www.lgbtcenters.org:443/Assets/Images/Social/fb-share-default-2020.png'}, {'title': 'LGBTAgingCenter.org - Resources - In Maryland', 'link': 'https://www.lgbtagingcenter.org/resources/resources.cfm?st=MD', 'text': "We're steadily creating a resource center that will provide resources across a variety of LGBT aging topics. Tell us what you'd like to see and sign up for updates.", 'image': 'http://www.lgbtagingcenter.org/images/logobig.gif'}, {'title': 'LGBT rights in Maryland - Wikipedia', 'link': 'https://en.wikipedia.org/wiki/LGBT_rights_in_Maryland', 'text': 'Lesbian, gay, bisexual, and transgender (LGBT) persons in the U.S. state of Maryland enjoy the same rights as non-LGBT people. Maryland has had statewide\xa0...\nDiscrimination protections: Protections for both ...\nAdoption: Same-sex couples permitted to adopt\nGender identity: Transgender people allowed to ...\nRecognition of relationships: Same-sex marria...', 'image': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Map_of_USA_MD.svg/1200px-Map_of_USA_MD.svg.png'}, {'title': 'Resources - LGBTQ+ Services - Loyola University Maryland ...', 'link': 'https://www.loyola.edu/department/lgbtq-services/resources', 'text': 'FreeState Justice - Envision a Maryland where people across the spectrum of lesbian, gay, bisexual, transgender, and queer identities are free to live authentically,\xa0...', 'image': 'https://www.loyola.edu/-/media/explore/grove/outdoor-adventure-experience/oae-preview-min.ashx'}]);
  const [articleIndex, setArticleIndex] = useState(0);
  const handleSkip = () => setArticleIndex(articleIndex+1);
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

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  return (
    <div className="App">
      <i class="fas fa-angle-left"></i>
      <div>
        {localNews.map((article) => console.log(article))}
      </div>
      <div style={{display: 'flex'}}>
        <h1>Local News</h1>
        {/*<div style={{ overflowX: "scroll", height: "auto", width: "30%" }}>
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
          </div>*/}
        <Jumbotron style={{marginTop: 30, width: "50%", height: "50%", position: 'absolute', left: '50%', transform: 'translate(-50%, 0%)'}}>
          <Card.Img variant="top" src={localNews[articleIndex]["image"]} style={{height: 200, width: "auto", alignSelf: "center"}}/>
          <h1>{localNews[articleIndex]["title"]}</h1>
          <p>{localNews[articleIndex]["text"]}</p>
          <div style={{position: 'absolute', left: '50%', transform: 'translate(-50%, 0%)'}}>
            <Button variant="danger" onClick={handleSkip}>Skip</Button>
            <Button variant="primary" style={{marginLeft: 20}} onClick={() => openInNewTab(localNews[articleIndex]["link"])}>View</Button>
          </div>
        </Jumbotron>
      </div>
    </div>
  );
}

export default News;
//https://kit.fontawesome.com/6564562c61.js
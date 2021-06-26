import urllib
import pandas
import requests
from newspaper import Article
from requests_html import HTML
from requests_html import HTMLSession
from flask import Flask, redirect, url_for, request
from flask_cors import CORS, cross_origin

# Send the get request to the specified url
def getResults(url):
    try:
        session = HTMLSession()
        response = session.get(url)
        return response
    except requests.exceptions.RequestException as error:
        print(error)

# Parse through response urls
def scrapeGoogle(query):
    response = getFullResults(query)
    return parse_results(response)

# Return the source of the search
def getFullResults(query):
    query = urllib.parse.quote_plus(query)
    response = getResults('https://www.google.com/search?q=%s'%(query))
    return response

# Structure the full results
def parse_results(response):
    output = []
    results = response.html.find('.tF2Cxc')
    for result in results:
        if ("topic" in result.find('.yuRUbf a', first=True).attrs['href']):
            pass
        else:
            try:
                article = Article(url=result.find('.yuRUbf a', first=True).attrs['href'], language='en')
                article.download()
                article.parse()
                item = {
                    "title": result.find('h3', first=True).text,
                    "link": result.find('.yuRUbf a', first=True).attrs['href'],
                    "text": result.find('.IsZvec', first=True).text,
                    "image": article.top_image,
                }
                output.append(item)
            except:
                pass
    print(output)
    return output

app = Flask(__name__)

@app.route('/search', methods=['POST'])
@cross_origin()
def search():
    print("Searching...")
    query = request.get_json()
    query = '%s "%s"'%(query["query"], query["location"])
    print(query)
    results = scrapeGoogle(query)
    return str(results)

if __name__ == '__main__':
    app.run(debug=True)
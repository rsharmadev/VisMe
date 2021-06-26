import requests
from requests_html import HTML
from requests_html import HTMLSession
import json
from flask import Flask, request


path = 'C:/Users/kprsh/Desktop/img/'


def getJson(url):
    session = HTMLSession()
    response = json.loads(session.get(url).text)
    print(response)
    extractUrls(response)
    

def extractUrls(json):
    urls = []
    for item in json['graphql']['shortcode_media']['edge_sidecar_to_children']['edges']:
        for key, value in item.items():
            print(key)
            urls.append(value['display_resources'][0]['src'])
    saveImages(urls)


def saveImages(urls):
    for url in urls:
        with open(f'{path}/{urls.index(url)}.png', 'wb') as f:
            f.write(requests.get(url).content)


app = Flask(__name__)

@app.route('/getImages', methods=['POST'])
def getImages():
    print(request.form)
    url = request.get_json()
    url = url['url']
    print(url)
    if url[-1] == '/':
        url += '?__a=1'
    else:
        url += '/?__a=1'
    getJson(url)
    return 'downloaded'

if __name__ == '__main__':
    app.run(debug=True)
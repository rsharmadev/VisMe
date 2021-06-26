import requests
from requests_html import HTML
from requests_html import HTMLSession
import json


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


if __name__ == '__main__':
    getJson('https://www.instagram.com/p/CPrCgdYr42B/?__a=1')
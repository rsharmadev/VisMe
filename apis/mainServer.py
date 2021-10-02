import urllib
import pandas
import requests
from newspaper import Article
from requests_html import HTML
from requests_html import HTMLSession
from flask import Flask, redirect, url_for, request, jsonify
from flask_cors import CORS, cross_origin
import json
import pytesseract
import numpy as np
import cv2
import os


ocrs = ''


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
    print(response)
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




# Instagram Image Get Correct
path = './img'


def getJson(url):
    session = HTMLSession()

    response = json.loads(session.get(url).text)
    print(response)
    extractUrls(response)
    

def extractUrls(json):
    print(json)
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



@app.route('/search', methods=['POST'])
@cross_origin()
def search():
    print("Searching...")
    query = request.get_json()
    query = '%s "%s"'%(query["query"], query["location"])
    print(query)
    results = scrapeGoogle(query)
    return jsonify(results)



@app.route('/getImages', methods=['POST'])
@cross_origin()
def getImages():
    global ocrs
    print('called')
    ocrs = ''
    print(request.form)
    url = request.get_json()
    url = url['url']
    print(url)
    if url[-1] == '/':
        url += '?__a=1'
    else:
        url += '/?__a=1'
    print(url)
    getJson(url)
    for filename in os.listdir('./img'):
        if filename.endswith('.png'):
            ocr(filename.replace('.png', ''))
    print(ocrs)
    return jsonify(ocrs)



def ocr(num):
    global ocrs
    print(num)
    pytesseract.pytesseract.tesseract_cmd = 'C:/Program Files (x86)/Tesseract-OCR/tesseract.exe'
    img = cv2.imread(f'./img/{num}.png')
    gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    gray, img_bin = cv2.threshold(gray,128,255,cv2.THRESH_BINARY | cv2.THRESH_OTSU)
    gray = cv2.bitwise_not(img_bin)
    kernel = np.ones((2, 1), np.uint8)
    img = cv2.erode(gray, kernel, iterations=1)
    img = cv2.dilate(img, kernel, iterations=1)
    out_below = pytesseract.image_to_string(img)
    ocrs += out_below
    # print(ocrs)
    




if __name__ == '__main__':
    app.run(debug=True)
from django.http import HttpResponse, JsonResponse
import requests
from bs4 import BeautifulSoup as Soup
import googlemaps
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

def index(request):
    chrome_options = Options()
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--headless')
    driver = webdriver.Chrome(options=chrome_options)
    driver.get('http://ncov.mohw.go.kr/regSocdisBoardView.do')
    page = driver.page_source
    soup = Soup(page, "html.parser")
    buttons = soup.find_all("button")
    dic = {}
    for btn in buttons:
        area = btn.find("span", {"class": "name"}).text
        level = btn.find("span", {"class": "num"}).text
        dic[area] = level
    lat = request.GET["lat"]
    lng = request.GET["lng"]
    gmaps = googlemaps.Client(key='AIzaSyBWHQ-OUPRiTKoOS0-voABsQ1s6zVLbkVY')
    reverse_geocode_result = gmaps.reverse_geocode((lat, lng), language = 'ko')
    doe = '서울'
    for loc in reverse_geocode_result:
        if 'administrative_area_level_1' in loc['types']:
            doe = loc['address_components'][0]['long_name']
    return JsonResponse({"dic": dic, "loc": doe})
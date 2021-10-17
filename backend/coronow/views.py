from django.http import HttpResponse, JsonResponse
import requests
from bs4 import BeautifulSoup as Soup
import googlemaps

def index(request):
    response = requests.get('http://ncov.mohw.go.kr/regSocdisBoardView.do')
    soup = Soup(response.text, "html.parser")
    buttons = soup.find_all("button")
    lat = request.GET["lat"]
    lng = request.GET["lng"]
    dic = {}
    for btn in buttons:
        area = btn.find("span", {"class": "name"}).text
        level = btn.find("span", {"class": "num"}).text
        dic[area] = level
        
    gmaps = googlemaps.Client(key='AIzaSyBWHQ-OUPRiTKoOS0-voABsQ1s6zVLbkVY')
    reverse_geocode_result = gmaps.reverse_geocode((lat, lng), language = 'ko')
    for loc in reverse_geocode_result:
        if 'administrative_area_level_1' in loc['types']:
            doe = loc['address_components'][0]['long_name']
    return JsonResponse({"dic": dic, "loc": doe})
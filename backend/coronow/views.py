from django.http import HttpResponse, JsonResponse
import requests
from bs4 import BeautifulSoup as Soup
import googlemaps
#import selenium
#from selenium import webdriver
#from selenium.webdriver import ActionChains

def index(request):
    '''
    headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36',
        'Cookie': '_ga=GA1.3.932589950.1634312900; __utma=181859515.932589950.1634312900.1634402667.1634402667.1; __utmz=181859515.1634402667.1.1.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); _gid=GA1.3.619913627.1634662116; JSESSIONID=jP06Zz0NdiXah1ZyYXaKMbR14o5nVHcDCqrfU3ChpUpqhCs9pAEskxl9Qi8Vwhfp.mohwwas1_servlet_engine40',
        'Host': 'ncov.mohw.go.kr',
        'Upgrade-Insecure-Requests': '1'
        }
    '''
    #url = 'http://ncov.mohw.go.kr/regSocdisBoardView.do'
    #driver = webdriver.Chrome(executable_path='chromedriver')
    #driver.get(url=url)

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
import React, { Component } from "react";
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doe: null,
      level: null,
      lat: 0,
      lng: 0,
      facility: '유흥시설',
    };
  }

  componentDidMount() {
    const updateLocation = (lat, lng) => {
      return new Promise((resolve, reject) => {
        this.setState({
          lat: lat,
          lng: lng
        }, () => {
          resolve()
        });
      });
    };

    const getLocation = async (position) => {
      await updateLocation(position.coords.latitude, position.coords.longitude);
      axios.get("http://18.223.136.196:8000/", {params: {"lat": this.state.lat, "lng": this.state.lng}})
      .then(res => {
        let doe = res.data['loc']
        doe = this.cutDoe(doe)
        this.setState({doe: doe})
        this.setState({level: res.data['dic'][doe]})
      })
      .catch(e => {
        console.log(e)
      })
    };

    navigator.geolocation.getCurrentPosition(function(position) {
      getLocation(position)
    });
  }

  render() {
    const table = {
      "유흥시설": {'1': '제한 없음', '2': '24시까지', '2.5': '22시까지', '3': '22시까지', '4': '금지'},
      "콜라텍/무도장": {'1': '제한 없음', '2': '24시까지', '2.5': '22시까지', '3': '22시까지', '4': '금지'},
      "홀덤펍/홀덤게임장": {'1': '제한 없음', '2': '24시까지', '2.5': '22시까지', '3': '22시까지', '4': '금지'},
      "식당/카페": {'1': '제한 없음', '2': '24시까지', '2.5': '22시까지', '3': '22시까지', '4': '22시까지'},
      "노래방": {'1': '제한 없음', '2': '24시까지', '2.5': '22시까지', '3': '22시까지', '4': '22시까지'},
      "목욕탕": {'1': '제한 없음', '2': '제한 없음', '2.5': '22시까지', '3': '22시까지', '4': '22시까지'},
      "실내체육시설": {'1': '제한 없음', '2': '제한 없음', '2.5': '제한 없음', '3': '제한 없음', '4': '22시까지'},
      "직접판매 홍보관": {'1': '제한 없음', '2': '제한 없음', '2.5': '22시까지', '3': '22시까지', '4': '22시까지'},
      "학원": {'1': '제한 없음', '2': '제한 없음', '2.5': '제한 없음', '3': '제한 없음', '4': '22시까지'},
      "영화관/공연장": {'1': '제한 없음', '2': '제한 없음', '2.5': '제한 없음', '3': '제한 없음', '4': '22시까지'},
      "독서실/스터디카페": {'1': '제한 없음', '2': '제한 없음', '2.5': '제한 없음', '3': '제한 없음', '4': '22시까지'},
      "결혼식장": {'1': '제한 없음', '2': '제한 없음', '2.5': '제한 없음', '3': '제한 없음', '4': '제한 없음'},
      "장례식장": {'1': '제한 없음', '2': '제한 없음', '2.5': '제한 없음', '3': '제한 없음', '4': '제한 없음'},
      "놀이공원": {'1': '제한 없음', '2': '제한 없음', '2.5': '제한 없음', '3': '제한 없음', '4': '22시까지'},
      "워터파크": {'1': '제한 없음', '2': '제한 없음', '2.5': '제한 없음', '3': '제한 없음', '4': '22시까지'},
      "오락실/멀티방": {'1': '제한 없음', '2': '제한 없음', '2.5': '제한 없음', '3': '제한 없음', '4': '22시까지'},
      "상점/마트/백화점": {'1': '제한 없음', '2': '제한 없음', '2.5': '제한 없음', '3': '제한 없음', '4': '22시까지'},
      "카지노(내국인)": {'1': '제한 없음', '2': '제한 없음', '2.5': '제한 없음', '3': '제한 없음', '4': '22시까지'},
      "PC방": {'1': '제한 없음', '2': '제한 없음', '2.5': '제한 없음', '3': '제한 없음', '4': '22시까지'},
    }
    let level
    if(this.state.level){
      level = this.state.level.toString()
    }
    return (
      <div>
        <select name="job" onChange = {(event) => this.setState({facility: event.target.value})}>
          <option value="유흥시설">유흥시설</option>
          <option value="콜라텍/무도장">콜라텍/무도장</option>
          <option value="홀덤펍/홀덤게임장">홀덤펍/홀덤게임장</option>
          <option value="식당/카페">식당/카페</option>
          <option value="노래방">노래방</option>
          <option value="목욕탕">목욕탕</option>
          <option value="실내체육시설">실내체육시설</option>
          <option value="직접판매 홍보관">직접판매 홍보관</option>
          <option value="학원">학원</option>
          <option value="영화관/공연장">영화관/공연장</option>
          <option value="독서실/스터디카페">독서실/스터디카페</option>
          <option value="결혼식장">결혼식장</option>
          <option value="장례식장">장례식장</option>
          <option value="놀이공원">놀이공원</option>
          <option value="워터파크">워터파크</option>
          <option value="오락실/멀티방">오락실/멀티방</option>
          <option value="상점/마트/백화점">상점/마트/백화점</option>
          <option value="카지노(내국인)">카지노(내국인)</option>
          <option value="PC방">PC방</option>
        </select>
        <h4>{this.state.doe}</h4>
        <h4>{this.state.level}</h4>
        <h4>{table[this.state.facility][level]}</h4>
      </div>
    );
  }

  cutDoe(doe){
    switch(doe){
      case '서울특별시':
        doe = '서울'
        break
      case '부산광역시':
        doe = '부산'
        break
      case '대구광역시':
        doe = '대구'
        break
      case '인천광역시':
        doe = '인천'
        break
      case '광주광역시':
        doe = '광주'
        break
      case '대전광역시':
        doe = '대전'
        break
      case '울산광역시':
        doe = '울산'
        break
      case '세종특별자치시':
        doe = '세종'
        break
      case '충청북도':
        doe = '충북'
        break
      case '충청남도':
        doe = '충남'
        break
      case '전라북도':
        doe = '전북'
        break
      case '전라남도':
        doe = '전남'
        break
      case '경상북도':
        doe = '경북'
        break
      case '경상남도':
        doe = '경남'
        break
      default:
        break
    }
    return doe
  }
}

export default App;

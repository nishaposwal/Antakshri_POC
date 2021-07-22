import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable()
export class AppService {
  private config: any = {};
  private content: any = {};
  private userInfo: any = {};
  private userProfile: any = {};
  private lang;
  hostApp;
  coords = {
    latitude: 0,
    longitude: 0
  };
  noPrizeErrorContext;
  wheelInfo;
  prizeWonInfo

  setUserInfo(info) {
    this.userInfo = info;
    localStorage['userInfo'] = JSON.stringify(info);
  }

  getUserInfo() {
    const userInfo = localStorage['userInfo'];
    if (userInfo) {
      return JSON.parse(userInfo);
    }
    return this.userInfo;
  }

  setConfig(config) {
    this.config = config || environment["configUrl"];
    console.log(this.config);
  }

  setContent(content) {
    this.content = content || environment["content"];
    console.log(this.content);
  }

  setLanguage(lang) {
    this.lang = lang;
  }

  getLanguage() {
    return this.lang;
  }

  getConfigParam(param) {
    return this.config[param];
  }

  getContent() {
    return this.content;
  }
  
  setUserProfile(profile) {
    Object.assign(this.userProfile, profile);
  }

  getUserProfile() {
    return this.userProfile;
  }

  setLocationCords(latitude, longitude) {
    this.coords.latitude = latitude;
    this.coords.longitude = longitude;
  }

  getLocationCoords() {
    return this.coords;
  }

  setNoPrizeErrorContext(context){
    this.noPrizeErrorContext = context;
  }
  getNoPrizeErrorContext(){
    return this.noPrizeErrorContext;
  }

  setHostApp(app) {
    this.hostApp = app;
  }

  getHostApp() {
    return (this.hostApp || 'myjio').toLowerCase();
  }

  getOS() {
    if (navigator.userAgent.match(/Android/i)) {
      return 'android';
    }
    if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
      return 'ios';
    }
    return 'others';
  }

  setWheelInfo(wheelInfo) {
    this.wheelInfo = wheelInfo;
  }

  getWheelInfo() {
    return this.wheelInfo
  }

  setPrizeWonInfo(prizeWonInfo) {
    this.prizeWonInfo = prizeWonInfo;
  }

  getPrizeWonInfo() {
    return this.prizeWonInfo;
  }

  logout() {
    this.setUserInfo({});
  }
}

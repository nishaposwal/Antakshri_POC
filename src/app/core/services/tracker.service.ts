import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { Router } from '@angular/router';
import { LoggerService } from './logger.service';
declare const dataLayer: any;

@Injectable({
  providedIn: 'root'
})
export class TrackerService {

  constructor(
    private appService: AppService,
    private router: Router,
    private logger: LoggerService,
  ) { }

  trackGAPageLoad( pageTitle, appName) {
    let pageData: any = {};
    try {
      pageData = {
        event: 'virtualPageView',
        virtualPageURL: this.router.url,
        virtualPageTitle: pageTitle,
        appName: 'Spin2Win_UPI',
        env: this.appService.getConfigParam('ENV')
      };
      dataLayer.push(pageData);
    } catch (e) {
      this.logger.error('Error tracking GA Page');
    }
  }
  trackGAClickTrack(action, label, extras?) {
    let linkData: any = {};
    try {
      if (extras) {
        linkData = {
          event:'spin2winUPI',
          new_Category: 'Spin2Win UPI',
          new_Label: label,
          new_Action: action,
          ...extras
        };
      } else {
        linkData = {
          event:'spin2winUPI',
          new_Category: 'Spin2Win UPI',
          new_Label: label,
          new_Action: action
        };
      }
      dataLayer.push(linkData);
    } catch (e) {
      this.logger.error('Error tracking Link');
    }
  }

}

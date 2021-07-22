import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';

import { AppService } from './app.service';
import { EventEmitterService } from './../../core/services/event-emitter.service';
import { LoggerService } from './logger.service';

declare const window: any;
declare const webkit: any;

@Injectable({
  providedIn: 'root'
})
export class ExternalInterfaceService {
  public subject$: Subject<any> = new Subject();

  constructor(
    private zone: NgZone,
    private router: Router,
    private appService: AppService,
    private logger: LoggerService,
    private eventEmitterService : EventEmitterService
  ) {
    this.setupCallbacksFromNative();
  }

  share(data) {
    this.externalCall(
      btoa(
        JSON.stringify({
          type: 'share',
          desc: data
        })
      )
    );
  }

  playSound(audioObj) {
    this.stopSound();
    this.externalCall(
      btoa(
        JSON.stringify({
          type: 'playinternalsound',
          path: audioObj.path || null,
          loop: audioObj.loop || false,
          name: audioObj.name || null
        })
      )
    );
  }

  stopSound() {
    this.externalCall(
      btoa(
        JSON.stringify({
          type: 'stopsound'
        })
      )
    );
  }

  launchBrowser(url) {
    this.externalCall(
      btoa(
        JSON.stringify({
          type: 'launchbrowser',
          value: url
        })
      )
    );
  }

  playJioCinemaVideo(url) {
    this.externalCall(
      btoa(
        JSON.stringify({
          type: 'playJioCinemaVideo',
          value: url
        })
      )
    );
  }

  requestMicrophone() {
    this.externalCall(
      btoa(
        JSON.stringify({
          type: 'microphone',
          config: {
            type: 'speech',
            language: 'hi'
          }
        })
      )
    );
  }

  sendLoadComplete() {
    this.externalCall(
      btoa(
        JSON.stringify({
          type: 'loadingCompleted'
        })
      )
    );
  }

  close() {
    this.externalCall(
      btoa(
        JSON.stringify({
          type: 'close'
        })
      )
    );
  }

  requestJWT() {
    this.externalCall(
      btoa(
        JSON.stringify({
          type: 'jwt'
        })
      )
    );
  }
  refreshJWT() {
    this.externalCall(
      btoa(
        JSON.stringify({
          type: 'refreshJWT'
        })
      )
    );
  }
  redirectToUPI() {
    this.externalCall(
      btoa(
        JSON.stringify({
          type: 'navigateToUPI'
        })
      )
    );
  }

  requestVideoCapture() {
    this.externalCall(
      btoa(
        JSON.stringify({
          type: 'video'
        })
      )
    );
  }

  private externalCall(data) {
    try {
      if (window.android && window.android.__externalCall) {
        window.android.__externalCall(data);
      }
      if (window.__externalCall) {
        window.__externalCall(data);
      }
      webkit.messageHandlers.callback.postMessage(data);
    } catch (e) {
      this.logger.error('external call failed');
    }
  }

  requestAdParams() {
    this.externalCall(
      btoa(
        JSON.stringify({
          type: "adparams"
        })
      )
    );
  }

  public setupCallbacksFromNative() {
    window.sendJwt = jwt => {
      this.zone.run(() => {
        this.appService.setUserInfo({ jwt: jwt });
        this.router.navigate(['/']);
      });
    };

    window.sendTextForSpeech = text => {
      this.zone.run(() => {
        this.eventEmitterService.emit({
          type: 'TEXT_FROM_NATIVE',
          data: text || ''
        });
      });
    };

    window.sendJWT = jwt => {
      this.zone.run(() => {
        this.appService.setUserInfo({ jwt: jwt });
        this.router.navigate(['/']);
      });
    };
    window.sendCapturedVideoFromCamera = config => {
      alert('sendCapturedVideoFromCamera called with ' + JSON.stringify(config));
    };
    window.sendAdParams = (params) => {
      // alert('params >>' + JSON.stringify(params));
      // params will have latitude, longitude, Adid, OS
      let userIfa = '';
      let lat, long;
        userIfa = params.Adid;
        lat = params.latitude;
        long = params.longitude;
        this.appService.setLocationCords(lat, long);
        window.AD_USER = {
          userIfa,
          city: "",
          state: "",
          gender: "",
          age: "",
          uid: ""
        };
  
        window.AD_INFO = {
          lat: "" + lat,
          lng: "" + long
        };
      // this.eventEmitterService.emit({
      //   type: 'AD_PARAMS',
      //   data: JSON.parse(params)
      // });
    };
    
    window.ADSDKEXT = {};
    window.ADSDKEXT.click_handler = url => this.launchBrowser(url);

    window.handleBackKey = () => {
      this.zone.run(() => {
        this.eventEmitterService.emit({
          type: 'NATIVE_BACK_CLICKED',
          data: ''
        });
      });
    };
  }


  sendNativeBackControl(data) {
    this.externalCall(
      btoa(
        JSON.stringify({
          type: 'handleWebviewBack',
          value: data
        })
      )
    );
  }

}

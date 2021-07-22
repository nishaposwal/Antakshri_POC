import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class ServerLogService {
  constructor(
    private restService: RestService,
    private appService: AppService,
  ) {}

  log(payloadOBJ) {
    return this.restService.post(
      `${this.appService.getConfigParam('API_HOST')}/log`, payloadOBJ
    );
  }
}

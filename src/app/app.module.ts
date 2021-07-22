import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { CoreModule } from './core/core.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppService, RestService } from './core/services';
import { forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';

export function loadConfig(appService: AppService, restService: RestService) {
  return () =>
    forkJoin(
      restService.get(environment.configUrl),
      restService.get(environment.contentUrl),
    )
      .toPromise()
      .then(res => {
        appService.setConfig(res[0]);
        appService.setContent(res[1]);
      });
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      multi: true,
      deps: [AppService, RestService]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

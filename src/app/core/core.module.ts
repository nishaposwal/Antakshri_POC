import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import * as fromServices from "./services";
const services = [ ...fromServices.services ];

@NgModule({
  imports: [
  CommonModule,
    HttpClientModule
  ],
  declarations: [
  ],
  providers: [
  ...services,
  ],
  exports: [
    CommonModule,
    HttpClientModule,
  ]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}

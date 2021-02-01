import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {
  componentRegistryInitializerFactory,
  ComponentRegistryService,
  DynamicComponents,
  NgDynamicComponentsModule
} from 'ng-dynamic-components';

import { AppComponent } from './app.component';
import { OneComponent } from './components/one/one.component';
import { ThreeComponent } from './components/three/three.component';
import { TwoComponent } from './components/two/two.component';



@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgDynamicComponentsModule.withComponents({ OneComponent, TwoComponent, ThreeComponent })],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: componentRegistryInitializerFactory,
      multi: true,
      deps: [ComponentRegistryService, DynamicComponents]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

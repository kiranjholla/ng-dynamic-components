import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {
  registryInitializerFactory,
  ComponentRegistryService,
  NgDynamicComponentsModule
} from 'ng-dynamic-components';

import { AppComponent } from './app.component';
import { RegistryModule } from './registry/registry.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgDynamicComponentsModule.withRegistry(RegistryModule)],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: registryInitializerFactory,
      multi: true,
      deps: [ComponentRegistryService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

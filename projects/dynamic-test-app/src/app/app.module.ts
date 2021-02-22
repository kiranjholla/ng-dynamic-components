import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DynamicRegistry, NgDynamicComponentsModule } from 'ng-dynamic-components';
import { AppComponent } from './app.component';
import { RegistryModule } from './registry/registry.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RegistryModule, NgDynamicComponentsModule],
  providers: [{ provide: DynamicRegistry, useValue: RegistryModule.componentsMap, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {}

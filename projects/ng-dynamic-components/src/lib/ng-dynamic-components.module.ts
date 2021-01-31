import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { ComponentOutletComponent } from './components/component-outlet/component-outlet.component';
import { ComponentRegistryService, DynamicComponents } from './services/component-registry.service';

@NgModule({
  declarations: [ComponentOutletComponent],
  imports: [],
  exports: [ComponentOutletComponent]
})
export class NgDynamicComponentsModule {
  static withComponents(dynamicComponents: Type<any>[]): ModuleWithProviders<NgDynamicComponentsModule> {
    return {
      ngModule: NgDynamicComponentsModule,
      providers: [{ provide: DynamicComponents, useValue: dynamicComponents }, ComponentRegistryService]
    };
  }
}

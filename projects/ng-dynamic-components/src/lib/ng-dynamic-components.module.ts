import { ModuleWithProviders, NgModule } from '@angular/core';

import { ComponentOutletComponent } from './components/component-outlet/component-outlet.component';
import { ComponentRegistryItems } from './models/component-registry-items.model';
import { ComponentRegistryService, DynamicComponents } from './services/component-registry.service';

@NgModule({
  declarations: [ComponentOutletComponent],
  imports: [],
  exports: [ComponentOutletComponent]
})
export class NgDynamicComponentsModule {
  static withComponents(dynamicComponents: ComponentRegistryItems): ModuleWithProviders<NgDynamicComponentsModule> {
    return {
      ngModule: NgDynamicComponentsModule,
      providers: [{ provide: DynamicComponents, useValue: dynamicComponents }, ComponentRegistryService]
    };
  }
}

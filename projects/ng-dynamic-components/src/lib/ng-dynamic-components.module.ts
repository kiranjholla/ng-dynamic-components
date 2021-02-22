import { NgModule } from '@angular/core';

import { ComponentOutletComponent } from './components/component-outlet/component-outlet.component';
import { ComponentRegistryService } from './services/component-registry.service';

@NgModule({
  declarations: [ComponentOutletComponent],
  imports: [],
  providers: [ComponentRegistryService],
  exports: [ComponentOutletComponent]
})
export class NgDynamicComponentsModule {}

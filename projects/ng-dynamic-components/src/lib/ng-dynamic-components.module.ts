import { Compiler, CompilerFactory, COMPILER_OPTIONS, ModuleWithProviders, NgModule } from '@angular/core';
import { JitCompilerFactory } from '@angular/platform-browser-dynamic';

import { ComponentOutletComponent } from './components/component-outlet/component-outlet.component';
import { ComponentRegistryModuleType, ComponentRegistryService, DynamicRegistry } from './services/component-registry.service';

export function createCompiler(factory: CompilerFactory): any {
  return factory.createCompiler([{ useJit: true }]);
}

@NgModule({
  declarations: [ComponentOutletComponent],
  imports: [],
  exports: [ComponentOutletComponent]
})
export class NgDynamicComponentsModule {
  static withRegistry(dynamicRegistry: ComponentRegistryModuleType<any>): ModuleWithProviders<NgDynamicComponentsModule> {
    return {
      ngModule: NgDynamicComponentsModule,
      providers: [
        { provide: COMPILER_OPTIONS, useValue: [{ useJit: true }] },
        { provide: CompilerFactory, useClass: JitCompilerFactory, deps: [COMPILER_OPTIONS] },
        { provide: Compiler, useFactory: createCompiler, deps: [CompilerFactory] },
        { provide: DynamicRegistry, useValue: dynamicRegistry },
        ComponentRegistryService
      ]
    };
  }
}

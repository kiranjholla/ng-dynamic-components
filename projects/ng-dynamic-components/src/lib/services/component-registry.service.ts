import { Compiler, ComponentFactory, ComponentRef, Inject, Injectable, InjectionToken, Injector, Type } from '@angular/core';

export const DynamicRegistry = new InjectionToken('DYNAMIC_REGISTRY');

export function registryInitializerFactory(componentRegistry: ComponentRegistryService): () => Promise<any> {
  return () => componentRegistry.initializeRegistry();
}

export interface ComponentRegistryModuleType<T> extends Type<T> {
  componentsMap: { [name: string]: Type<any> };
}

@Injectable()
export class ComponentRegistryService {
  private registry: { [name: string]: ComponentFactory<{}> } = {};

  constructor(
    private readonly compiler: Compiler,
    private readonly injector: Injector,
    @Inject(DynamicRegistry)
    private dynamicRegistry: ComponentRegistryModuleType<any>
  ) {}

  initializeRegistry(registry?: ComponentRegistryModuleType<any>): Promise<any> {
    const dynamicRegistry = registry || this.dynamicRegistry;

    return this.compiler.compileModuleAndAllComponentsAsync(dynamicRegistry).then(compiledModule => {
      const { componentsMap } = compiledModule.ngModuleFactory.moduleType as ComponentRegistryModuleType<any>;
      compiledModule.componentFactories.forEach(compFactory => {
        const originalComponentName = Object.keys(componentsMap).find(
          (compName: string) => componentsMap[compName].name === compFactory.componentType.name
        );

        if (originalComponentName) {
          this.registry[originalComponentName] = compFactory;
        }
      });
    });
  }

  getComponent(componentName: string): ComponentRef<{}> {
    if (!Object.keys(this.registry).length) {
      throw new Error('Dynamic Component Registry has not been initialized.');
    }

    if (this.registry[componentName]) {
      return this.registry[componentName].create(this.injector);
    } else {
      throw new Error(`Component by name ${componentName} is not registered in the Dynamic Component Registry.`);
    }
  }
}

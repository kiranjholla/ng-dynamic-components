import { Compiler, ComponentFactory, ComponentRef, Inject, Injectable, InjectionToken, Injector, NgModule, Type } from '@angular/core';

export const DynamicComponents = new InjectionToken('DYNAMIC_COMPONENTS');

export function componentRegistryInitializerFactory(
  componentRegistry: ComponentRegistryService,
  dynamicComponents: Type<any>[]
): () => Promise<any> {
  return () => componentRegistry.initializeRegistry(dynamicComponents);
}

@Injectable()
export class ComponentRegistryService {
  private registry: { [name: string]: ComponentFactory<{}> } = {};

  constructor(
    private readonly compiler: Compiler,
    private readonly injector: Injector,
    @Inject(DynamicComponents) private dynamicComponents: Type<any>[]
  ) {}

  initializeRegistry(components?: Type<any>[]): Promise<any> {
    const dynamicComponents = components || this.dynamicComponents;

    if (dynamicComponents.length) {
      this.registry = {};

      const registryModule = NgModule({ declarations: [...dynamicComponents] })(class ComponentRegistryModule {});

      return this.compiler.compileModuleAndAllComponentsAsync(registryModule).then(factories => {
        factories.componentFactories.forEach(compFactory => (this.registry[compFactory.componentType.name] = compFactory));
      });
    } else {
      return Promise.resolve();
    }
  }

  getComponent(componentName: string): ComponentRef<{}> {
    if (!Object.keys(this.registry).length) {
      throw new Error('Dynamic Component Registry has not been initilized.');
    }

    if (this.registry[componentName]) {
      return this.registry[componentName].create(this.injector);
    } else {
      throw new Error(`Component by name ${componentName} is not registered in the Dynamic Component Registry.`);
    }
  }
}

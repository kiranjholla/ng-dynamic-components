import { Compiler, ComponentFactory, ComponentRef, Inject, Injectable, InjectionToken, Injector, NgModule, Type } from '@angular/core';

import { ComponentRegistryItems } from '../models/component-registry-items.model';

export const DynamicComponents = new InjectionToken('DYNAMIC_COMPONENTS');

export function componentRegistryInitializerFactory(
  componentRegistry: ComponentRegistryService,
  dynamicComponents: ComponentRegistryItems
): () => Promise<any> {
  return () => componentRegistry.initializeRegistry(dynamicComponents);
}

export type ComponentRegistryModule = Type<any> & {
  componentsMap: { name: string; component: Type<any> }[];
};

@Injectable()
export class ComponentRegistryService {
  private registry: { [name: string]: ComponentFactory<{}> } = {};

  constructor(
    private readonly compiler: Compiler,
    private readonly injector: Injector,
    @Inject(DynamicComponents) private dynamicComponents: ComponentRegistryItems
  ) {}

  initializeRegistry(components?: ComponentRegistryItems): Promise<any> {
    const dynamicComponents = components || this.dynamicComponents;

    if (Object.keys(dynamicComponents).length) {
      this.registry = {};

      const registryModule = NgModule({ declarations: [...Object.values(dynamicComponents)] })(
        class ComponentRegistryModule {
          static componentsMap: { name: string; component: Type<any> }[] = Object.keys(dynamicComponents).map(key => ({
            name: key,
            component: dynamicComponents[key]
          }));
        }
      );

      return this.compiler.compileModuleAndAllComponentsAsync(registryModule).then(compiledModule => {
        compiledModule.componentFactories.forEach(compFactory => {
          const originalComponentName = (compiledModule.ngModuleFactory.moduleType as ComponentRegistryModule).componentsMap?.find(
            (regItem: { name: string; component: Type<any> }) => regItem.component.name === compFactory.componentType.name
          )?.name;

          if (originalComponentName) {
            this.registry[originalComponentName] = compFactory;
          }
        });
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

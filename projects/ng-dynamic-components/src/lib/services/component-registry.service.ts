import { ComponentFactoryResolver, ComponentRef, Inject, Injectable, InjectionToken, Injector, Optional, Type } from '@angular/core';

export const DynamicRegistry = new InjectionToken('DYNAMIC_REGISTRY');

export interface ComponentRegistry {
  [name: string]: Type<any>;
}

@Injectable()
export class ComponentRegistryService {
  private registry: ComponentRegistry;

  constructor(
    private readonly injector: Injector,
    private readonly resolver: ComponentFactoryResolver,
    @Optional() @Inject(DynamicRegistry) private dynamicRegistry: ComponentRegistry[]
  ) {
    this.registry = this.dynamicRegistry.reduce((a, x) => ({ ...a, ...x }), {});
  }

  getComponent(componentName: string): ComponentRef<{}> {
    if (!this.registry) {
      throw new Error('No provider for Dynamic Component Registry.');
    }

    if (!Object.keys(this.registry).length) {
      throw new Error('Dynamic Component Registry has not been initialized.');
    }

    if (this.registry[componentName]) {
      return this.resolver.resolveComponentFactory(this.registry[componentName]).create(this.injector);
    } else {
      throw new Error(`Component by name ${componentName} is not registered in the Dynamic Component Registry.`);
    }
  }
}

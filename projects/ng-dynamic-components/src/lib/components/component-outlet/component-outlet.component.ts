import {
  AfterViewInit,
  Component,
  ComponentRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { ComponentData } from '../../models/component-data.model';
import { ComponentRegistryService } from '../../services/component-registry.service';

@Component({
  selector: 'ndc-component-outlet',
  templateUrl: './component-outlet.component.html',
  styleUrls: ['./component-outlet.component.scss']
})
export class ComponentOutletComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() componentData!: ComponentData;

  @ViewChild('componentOutlet', { read: ViewContainerRef }) outlet!: ViewContainerRef;

  private loadedComponent!: ComponentRef<{}> | null;

  constructor(private registry: ComponentRegistryService) {}

  ngAfterViewInit(): void {
    Promise.resolve().then(() => this.loadComponent());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.componentData && this.loadedComponent) {
      if (this.loadComponent.name !== changes.componentData.currentValue.name) {
        this.loadComponent();
      } else {
        (this.loadedComponent?.instance as any).componentData = (changes.componentData as any).data;
      }
    }
  }

  ngOnDestroy(): void {
    this.unloadComponent();
  }

  private loadComponent(): void {
    this.unloadComponent();

    const component = this.registry.getComponent(this.componentData.name);
    this.loadedComponent = component;
    (component.instance as any).componentData = this.componentData.data;
    this.outlet.insert(component.hostView);
  }

  private unloadComponent(): void {
    if (this.loadedComponent) {
      this.loadedComponent.destroy();
      this.loadedComponent = null;
    }
  }
}

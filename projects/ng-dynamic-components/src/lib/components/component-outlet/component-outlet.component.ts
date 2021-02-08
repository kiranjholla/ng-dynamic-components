import {
  AfterViewInit,
  Component,
  ComponentRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { isObservable } from 'rxjs';
import { ComponentData } from '../../models/component-data.model';
import { ComponentRegistryService } from '../../services/component-registry.service';

@Component({
  selector: 'ndc-component-outlet',
  templateUrl: './component-outlet.component.html',
  styleUrls: ['./component-outlet.component.scss']
})
export class ComponentOutletComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() componentData!: ComponentData;
  @Output() componentOutput = new EventEmitter<any>();

  @ViewChild('componentOutlet', { read: ViewContainerRef }) outlet!: ViewContainerRef;

  private loadedComponent!: ComponentRef<{}> | null;

  constructor(private registry: ComponentRegistryService) {}

  ngAfterViewInit(): void {
    // Setting up to load the Component in a Micro-Task to avoid
    // ExpressionChangedAfterItHasBeenCheckedError
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

    // Construct the Dynamic Component
    const componentRef = this.registry.getComponent(this.componentData.name);
    this.loadedComponent = componentRef;

    // Handle Inputs into the Dynamic Component
    (componentRef.instance as any).componentData = this.componentData.data;

    // Handle Outputs from the Dynamic Component
    const { componentOutput } = componentRef.instance as any;
    if (componentOutput && isObservable(componentOutput)) {
      (componentRef.instance as any).componentOutput.subscribe(this.componentOutput);
    }

    this.outlet.insert(componentRef.hostView);
  }

  private unloadComponent(): void {
    if (this.loadedComponent) {
      this.loadedComponent.destroy();
      this.loadedComponent = null;
    }
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OneComponent } from './components/one/one.component';
import { TwoComponent } from './components/two/two.component';
import { ThreeComponent } from './components/three/three.component';

@NgModule({
  declarations: [OneComponent, TwoComponent, ThreeComponent],
  imports: [CommonModule]
})
export class RegistryModule {
  static componentsMap = { OneComponent, TwoComponent, ThreeComponent };
}

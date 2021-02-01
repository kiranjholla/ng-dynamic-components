import { Component } from '@angular/core';

import { ComponentData } from 'ng-dynamic-components';

@Component({
  selector: 'dta-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  comps: ComponentData[] = [
    { name: 'OneComponent', data: { message: 'Some Message for One' } },
    { name: 'TwoComponent', data: { message: 'Some Message for Two' } },
    { name: 'ThreeComponent', data: { message: 'Some Message for Three' } }
  ];
}

import { Component } from '@angular/core';

import { ComponentData } from 'ng-dynamic-components';

@Component({
  selector: 'dta-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  comps: ComponentData[] = [
    { name: 'OneComponent', data: { message: 'Some Message for One', times: 1 } },
    { name: 'TwoComponent', data: { message: 'Some Message for Two', times: 2 } },
    { name: 'ThreeComponent', data: { message: 'Some Message for Three', times: 3 } }
  ];
}

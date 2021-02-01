import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dta-three',
  templateUrl: './three.component.html',
  styleUrls: ['./three.component.scss']
})
export class ThreeComponent implements OnInit {
  @Input() componentData: any = { message: 'Default Message in Three' };

  constructor() {}

  ngOnInit(): void {}
}

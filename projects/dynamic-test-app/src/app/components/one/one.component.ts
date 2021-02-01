import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dta-one',
  templateUrl: './one.component.html',
  styleUrls: ['./one.component.scss']
})
export class OneComponent implements OnInit {
  @Input() componentData: any = { message: 'Default Message in One' };

  constructor() {}

  ngOnInit(): void {}
}

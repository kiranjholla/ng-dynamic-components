import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dta-two',
  templateUrl: './two.component.html',
  styleUrls: ['./two.component.scss']
})
export class TwoComponent implements OnInit {
  @Input() componentData: any = { message: 'Default Message in Two' };

  constructor() {}

  ngOnInit(): void {}
}

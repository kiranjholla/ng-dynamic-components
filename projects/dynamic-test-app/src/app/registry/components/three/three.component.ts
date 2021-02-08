import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';

import { interval } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'dta-three',
  templateUrl: './three.component.html',
  styleUrls: ['./three.component.scss']
})
export class ThreeComponent implements AfterViewInit {
  @Input() componentData: any = { message: 'Default Message in Three' };
  @Output() componentOutput: EventEmitter<{ name: string; value: string }> = new EventEmitter<{ name: string; value: string }>();

  ngAfterViewInit(): void {
    interval(1000)
      .pipe(
        take(5),
        map(() => ({ name: 'Three', value: 'Message From Three' }))
      )
      .subscribe(this.componentOutput);
  }
}

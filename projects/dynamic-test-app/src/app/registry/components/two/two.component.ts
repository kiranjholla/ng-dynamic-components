import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';

import { interval } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'dta-two',
  templateUrl: './two.component.html',
  styleUrls: ['./two.component.scss']
})
export class TwoComponent implements AfterViewInit {
  @Input() componentData: any = { message: 'Default Message in Two' };
  @Output() componentOutput: EventEmitter<{ name: string; value: string }> = new EventEmitter<{ name: string; value: string }>();

  ngAfterViewInit(): void {
    interval(1000)
      .pipe(
        take(5),
        map(() => ({ name: 'Two', value: 'Message From Two' }))
      )
      .subscribe(this.componentOutput);
  }
}

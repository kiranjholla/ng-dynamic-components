import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';

import { interval } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'dta-one',
  templateUrl: './one.component.html',
  styleUrls: ['./one.component.scss']
})
export class OneComponent implements AfterViewInit {
  @Input() componentData: any = { message: 'Default Message in One' };
  @Output() componentOutput: EventEmitter<{ name: string; value: string }> = new EventEmitter<{ name: string; value: string }>();

  ngAfterViewInit(): void {
    interval(1000)
      .pipe(
        take(5),
        map(() => ({ name: 'One', value: 'Message From One' }))
      )
      .subscribe(this.componentOutput);
  }
}

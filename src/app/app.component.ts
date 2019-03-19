import { Component } from '@angular/core';
import { of, forkJoin } from 'rxjs';
import { take, first, map, concatAll, pluck, concatMap, flatMap } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';

  source$ = of({id: 12, name: 'Felix'});

  buddies$ = of([{id: 1, name: 'Linda'},
                {id: 2, name: 'Gallus'},
                {id: 3, name: 'Maik'},
                {id: 4, name: 'Dani'}
  ]);

  target$ = this.source$.pipe(
    concatMap(() => this.buddies$.pipe(
      concatAll(),
      first(),
      map( name => 'Hi ' + name.name))),
    flatMap(greeting => greeting))
    .subscribe( res => console.log(res));

}

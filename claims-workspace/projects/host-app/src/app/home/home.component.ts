import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadClaims, selectClaims, selectCount } from '@shared';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private store = inject(Store);
  count$: Observable<number> = this.store.select(selectCount);

      claims$ = this.store.select(selectClaims);
  
      constructor() {
      }
  
     ngOnInit(): void {
        this.store.dispatch(loadClaims());
        this.claims$.subscribe((claims)=>{
          console.log(claims);
        });
     }
}

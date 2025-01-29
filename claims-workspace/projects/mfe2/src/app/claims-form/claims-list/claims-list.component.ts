import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrement, increment, loadClaims, reset, selectClaims, ClaimsService, ClaimStatus, updateClaimStatus } from '@shared';
@Component({
  selector: 'app-claims-list',
  standalone: false,
  templateUrl: './claims-list.component.html',
  styleUrl: './claims-list.component.css'
})
export class ClaimsListComponent implements OnInit{

    sharedValue: string = '';
    private store = inject(Store);
    claims$ = this.store.select(selectClaims);
    statuses = Object.values(ClaimStatus);

    constructor(private claimsService: ClaimsService) {

    }

   ngOnInit(): void {
      this.store.dispatch(loadClaims());
   }
    

   OnStatusChange(claimId: string, event: Event){
      const status = ((event.target as HTMLSelectElement).value as ClaimStatus);
      this.store.dispatch(updateClaimStatus({claimId,status}))
   }

}

import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, switchMap, mergeMap, concatMap } from 'rxjs/operators';
import { ClaimsService } from '../../claims.service';
import * as ClaimsActions from './claims.actions';

@Injectable()
export class ClaimsEffects {
  private actions$ = inject(Actions);
  private claimsService = inject(ClaimsService);

loadClaims$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ClaimsActions.loadClaims),
      switchMap(() =>
        this.claimsService.getClaims().pipe(
          map((claims) => ClaimsActions.loadClaimsSuccess({ claims })),
          catchError((error) => 
            of(ClaimsActions.loadClaimsFailure({ error: error.message }))
          )
        )
      )
    )}
  );

  createClaim$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClaimsActions.createClaim),
      mergeMap(({ claim }) =>
        this.claimsService.createClaim(claim).pipe(
          map((createdClaim) => ClaimsActions.createClaimSuccess({ claim: createdClaim })),
          catchError((error) =>
            of(ClaimsActions.createClaimFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updateClaimStatus$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ClaimsActions.updateClaimStatus),
      concatMap(({ claimId, status }) =>
        this.claimsService.updateClaimStatus(claimId, status).pipe(
          map((updatedClaim) => 
            ClaimsActions.updateClaimStatusSuccess({ claim: updatedClaim })
          ),
          catchError((error) =>
            of(ClaimsActions.updateClaimStatusFailure({ error: error.message }))
          )
        )
      )
    );
  });

}






import { createAction, props } from '@ngrx/store';
import { Claim, ClaimStatus } from './claims.model';


// Load Claims

export const loadClaims = createAction('[Claims page] Load Claims');
export const loadClaimsSuccess = createAction(
  '[Claims Page] Load Claims Success',
  props<{ claims: Claim[] }>()
);
export const loadClaimsFailure = createAction(
  '[Claims Page] Load Claims Failure',
  props<{ error: string }>()
);

// Create Claim

export const createClaim = createAction(
  '[Claims Page] Create Claim',
  props<{ claim: Claim }>()
);

export const createClaimSuccess = createAction(
    '[Claims] Create Claim Success',
    props<{ claim: Claim }>()
  );
  
  export const createClaimFailure = createAction(
    '[Claims] Create Claim Failure',
    props<{ error: string }>()
  );


// Update Claim

export const updateClaimStatus = createAction(
    '[Claims] Update Claim Status',
    props<{ claimId: string; status: ClaimStatus }>()
  );

export const updateClaimStatusSuccess = createAction(
  '[Claims] Update Claim Status Success',
  props<{ claim: Claim }>()
);

export const updateClaimStatusFailure = createAction(
  '[Claims] Update Claim Status Failure',
  props<{ error: string }>()
);

// Select Claim

export const selectClaim = createAction(
  '[Claims] Select Claim',
  props<{ claimId: string }>()
);

import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ClaimsState } from './claims.model';

export const selectClaimsState = createFeatureSelector<ClaimsState>('claims');

export const selectClaims = createSelector(
    selectClaimsState,
  (state:ClaimsState) => state.claims
);

export const selectLoading = createSelector(
    selectClaimsState,
    (state:ClaimsState) => state.loading
);

export const selectError = createSelector(
    selectClaimsState,
    (state:ClaimsState) => state.error
);

// Select Selected Claim

export const selectSelectedClaimId = createSelector(
    selectClaimsState,
    (state) => state.selectedClaimId
  );
  
  export const selectSelectedClaim = createSelector(
    selectClaims,
    selectSelectedClaimId,
    (claims, selectedId) => claims.find(claim => claim.claimId === selectedId)
  );



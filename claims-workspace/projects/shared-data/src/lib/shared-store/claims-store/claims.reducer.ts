import { createReducer, on } from '@ngrx/store';
import * as ClaimsActions from './claims.actions';
import { ClaimsState, initialClaimsState } from './claims.model';

export const claimsReducer = createReducer(
    initialClaimsState,
// Load Claims
    on(ClaimsActions.loadClaims, (state) => ({
        ...state,
        loading: true,
        error: null
      })),

      on(ClaimsActions.loadClaimsSuccess, (state, { claims }) => ({
        ...state,
        claims,
        loading: false,
        error: null
      })),
      
      on(ClaimsActions.loadClaimsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
      })),

// Create Claim

on(ClaimsActions.createClaim, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(ClaimsActions.createClaimSuccess, (state, { claim }) => ({
    ...state,
    claims: [...state.claims, claim],
    loading: false
  })),
  
  on(ClaimsActions.createClaimFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
// Update Claim 

on(ClaimsActions.updateClaimStatus, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(ClaimsActions.updateClaimStatusSuccess, (state, { claim }) => ({
    ...state,
    claims: state.claims.map(c => c.claimId === claim.claimId ? claim : c),
    loading: false
  })),
  
  on(ClaimsActions.updateClaimStatusFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Select Claim

  on(ClaimsActions.selectClaim, (state, { claimId }) => ({
    ...state,
    selectedClaimId: claimId
  }))

);

//   on(deleteClaim, (state, { id }) => ({
//     ...state,
//      claims: state.claims.filter((claim)=> claim.claimId !== id) 
//  })),
//   on(updateClaim, (state, { content }) => {
//     let claimIndex = state.claims.findIndex((claim)=> (claim.claimId === content.claimId));
//     let updatedClaims = JSON.parse(JSON.stringify(state.claims));
//     if(claimIndex !== -1){
//           updatedClaims[claimIndex] = content;
//     }else{
//         updatedClaims.push(content);
//     }
//     return  { 
//         ...state,
//         claims:  updatedClaims
//      }
//     //  state.claims.map((claim)=> {
//     //     if(claim.claimId === content.claimId){
//     //         return {...claim, ...content}
//     //     }else{
//     //         claim
//     //     }
//     //  })
//   }),

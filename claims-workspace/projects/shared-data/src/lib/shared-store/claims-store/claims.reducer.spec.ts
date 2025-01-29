import { claimsReducer } from './claims.reducer';
import * as ClaimsActions from './claims.actions';
import { Claim, ClaimsState, ClaimStatus, initialClaimsState } from './claims.model';

describe('Claims Reducer', () => {

      let mockClaims: Claim[] = [
        {
          claimId: '1a2b3c',
          policyHolderName: 'John Smith',
          dateOfIncident: new Date('2024-01-15'),
          damageType: 'Vehicle',
          damageSubType: 'Fire',
          damageDescription: 'Front-end damage from collision with guard rail',
          estimatedRepairCost: 3500,
          status: ClaimStatus.PENDING,
          images: [],
        },
        {
          claimId: '2b3c4d',
          policyHolderName: 'Sarah Johnson',
          dateOfIncident: new Date('2024-01-20'),
          damageType: 'Property',
          damageSubType: 'Fire',
          damageDescription: 'Basement flooding due to heavy rainfall',
          estimatedRepairCost: 12000,
          status: ClaimStatus.UNDER_REVIEW,
          images: [],
        },
      ];
  
    it('should return the initial state when an unknown action is dispatched', () => {
      const action = { type: 'UNKNOWN_ACTION' } as any;
      const state = claimsReducer(initialClaimsState, action);
      expect(state).toEqual(initialClaimsState);
    });
  
    it('should set loading to true when loadClaims is dispatched', () => {
      const action = ClaimsActions.loadClaims();
      const state = claimsReducer(initialClaimsState, action);
      expect(state.loading).toBeTrue();
      expect(state.error).toBeNull();
    });
  
    it('should update claims and set loading to false on loadClaimsSuccess', () => {
      const action = ClaimsActions.loadClaimsSuccess({ claims: mockClaims });
      const state = claimsReducer(initialClaimsState, action);
      expect(state.claims).toEqual(mockClaims);
      expect(state.loading).toBeFalse();
      expect(state.error).toBeNull();
    });
  
    it('should set error and stop loading on loadClaimsFailure', () => {
      const errorMock = 'Failed to load claims';
      const action = ClaimsActions.loadClaimsFailure({ error: errorMock });
      const state = claimsReducer(initialClaimsState, action);
      expect(state.loading).toBeFalse();
      expect(state.error).toEqual(errorMock);
    });
  
    it('should add a claim on createClaimSuccess', () => {
      const action = ClaimsActions.createClaimSuccess({ claim: mockClaims[0] });
      const state = claimsReducer(initialClaimsState, action);
      expect(state.claims).toContain(mockClaims[0]);
      expect(state.loading).toBeFalse();
    });
  
    it('should update a claim on updateClaimStatusSuccess', () => {
      const initialState: ClaimsState = {
        ...initialClaimsState,
        claims: [mockClaims[0]]
      };
  
      const updatedClaim = { ...mockClaims[0], status: ClaimStatus.UNDER_REVIEW };
      const action = ClaimsActions.updateClaimStatusSuccess({ claim: updatedClaim });
      const state = claimsReducer(initialState, action);
  
      expect(state.claims[0].status).toEqual(updatedClaim.status);
    });
  
    it('should select a claim on selectClaim action', () => {
      const action = ClaimsActions.selectClaim({ claimId: "233" });
      const state = claimsReducer(initialClaimsState, action);
      expect(state.selectedClaimId).toEqual("233");
    });
  
  });
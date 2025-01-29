import * as ClaimsActions from './claims.actions';
import { Claim, ClaimStatus } from './claims.model';

describe('Claims Actions', () => {

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


  it('should create a loadClaims action', () => {
    const action = ClaimsActions.loadClaims();
    expect(action.type).toBe('[Claims page] Load Claims');
  });


  it('should create a loadClaimsSuccess action with claims payload', () => {
    const claims: Claim[] = mockClaims;

    const action = ClaimsActions.loadClaimsSuccess({ claims });
    
    expect(action.type).toBe('[Claims Page] Load Claims Success');
    expect(action.claims).toEqual(claims); 
  });


  it('should create a loadClaimsFailure action with error payload', () => {
    const error = 'Failed to load claims';
    const action = ClaimsActions.loadClaimsFailure({ error });
    
    expect(action.type).toBe('[Claims Page] Load Claims Failure');
    expect(action.error).toBe(error); 
  });

  it('should create a createClaim action with claim payload', () => {
    const claim: Claim = mockClaims[0];
    const action = ClaimsActions.createClaim({ claim });

    expect(action.type).toBe('[Claims Page] Create Claim');
    expect(action.claim).toEqual(claim); 
  });

  it('should create a createClaimSuccess action with claim payload', () => {
    const claim: Claim = mockClaims[0];
    const action = ClaimsActions.createClaimSuccess({ claim });

    expect(action.type).toBe('[Claims] Create Claim Success');
    expect(action.claim).toEqual(claim); 
  });

  it('should create a createClaimFailure action with error payload', () => {
    const error = 'Failed to create claim';
    const action = ClaimsActions.createClaimFailure({ error });

    expect(action.type).toBe('[Claims] Create Claim Failure');
    expect(action.error).toBe(error); 
  });

  it('should create an updateClaimStatus action with claimId and status payload', () => {
    const claimId = 'CLM123';
    const status = ClaimStatus.APPROVED;
    const action = ClaimsActions.updateClaimStatus({ claimId, status });

    expect(action.type).toBe('[Claims] Update Claim Status');
    expect(action.claimId).toBe(claimId);
    expect(action.status).toBe(status); 
  });

  it('should create an updateClaimStatusSuccess action with claim payload', () => {
    const claim: Claim = mockClaims[0];
    const action = ClaimsActions.updateClaimStatusSuccess({ claim });

    expect(action.type).toBe('[Claims] Update Claim Status Success');
    expect(action.claim).toEqual(claim);
  });

  it('should create an updateClaimStatusFailure action with error payload', () => {
    const error = 'Failed to update claim status';
    const action = ClaimsActions.updateClaimStatusFailure({ error });

    expect(action.type).toBe('[Claims] Update Claim Status Failure');
    expect(action.error).toBe(error); 
  });

  it('should create a selectClaim action with claimId payload', () => {
    const claimId = 'CLM123';
    const action = ClaimsActions.selectClaim({ claimId });

    expect(action.type).toBe('[Claims] Select Claim');
    expect(action.claimId).toBe(claimId);
  });
});

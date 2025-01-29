import { Store, StoreModule } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { ClaimsState } from './claims.model';
import { selectClaims, selectLoading, selectError, selectSelectedClaimId, selectSelectedClaim } from './claims.selectors';
import { Claim, ClaimStatus } from './claims.model';

describe('Claims Selectors', () => {
  let store: Store<ClaimsState>;

  const mockClaimsState: ClaimsState = {
    claims:  [
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
    ],
    loading: false,
    error: null,
    selectedClaimId: 'CLM123'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({ claims: () => mockClaimsState })
      ],
    });

    store = TestBed.inject(Store);
  });

  it('should select the claims state', () => {
    const selectedClaims = selectClaims.projector(mockClaimsState);
    expect(selectedClaims).toEqual(mockClaimsState.claims);
  });

  it('should select the loading state', () => {
    const selectedLoading = selectLoading.projector(mockClaimsState);
    expect(selectedLoading).toBe(mockClaimsState.loading);
  });

  it('should select the error state', () => {
    const selectedError = selectError.projector(mockClaimsState);
    expect(selectedError).toBe(mockClaimsState.error);
  });

  it('should select the selectedClaimId state', () => {
    const selectedClaimId = selectSelectedClaimId.projector(mockClaimsState);
    expect(selectedClaimId).toBe(mockClaimsState.selectedClaimId);
  });

  it('should select the selected claim', () => {
    const selectedClaim = selectSelectedClaim.projector(mockClaimsState.claims, mockClaimsState.selectedClaimId);
    const expectedClaim = mockClaimsState.claims.find(claim => claim.claimId === mockClaimsState.selectedClaimId);
    expect(selectedClaim).toEqual(expectedClaim);
  });

  it('should return undefined if no claim is selected', () => {
    const modifiedState = { ...mockClaimsState, selectedClaimId: 'NON_EXISTENT_ID' };
    const selectedClaim = selectSelectedClaim.projector(modifiedState.claims, modifiedState.selectedClaimId);
    expect(selectedClaim).toBeUndefined();
  });

  it('should return undefined if claims are empty', () => {
    const emptyState: ClaimsState = { claims: [], loading: false, error: null, selectedClaimId: 'CLM123' };
    const selectedClaim = selectSelectedClaim.projector(emptyState.claims, emptyState.selectedClaimId);
    expect(selectedClaim).toBeUndefined();
  });
});

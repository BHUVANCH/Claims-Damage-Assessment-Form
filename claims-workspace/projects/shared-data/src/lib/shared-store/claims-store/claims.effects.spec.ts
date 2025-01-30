
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { ClaimsEffects } from './claims.effects';
import { ClaimsService } from '../../claims.service';
import * as ClaimsActions from './claims.actions';
import { Claim, ClaimStatus } from './claims.model';

describe('ClaimsEffects', () => {
  let effects: ClaimsEffects;
  let actions$: Observable<any>;
  let claimsServiceSpy: jasmine.SpyObj<ClaimsService>;
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

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ClaimsService', ['getClaims', 'createClaim', 'updateClaimStatus']);
    
    TestBed.configureTestingModule({
      providers: [
        ClaimsEffects,
        provideMockActions(() => actions$),
        { provide: ClaimsService, useValue: spy }
      ]
    });

    effects = TestBed.inject(ClaimsEffects);
    claimsServiceSpy = TestBed.inject(ClaimsService) as jasmine.SpyObj<ClaimsService>;
  });

  describe('loadClaims$', () => {
    it('should return loadClaimsSuccess with claims on successful load', (done) => {
      actions$ = of(ClaimsActions.loadClaims());
      
      claimsServiceSpy.getClaims.and.returnValue(of(mockClaims));

      effects.loadClaims$.subscribe(action => {
        expect(action).toEqual(ClaimsActions.loadClaimsSuccess({ claims: mockClaims }));
        done();
      });
    });

    it('should return loadClaimsFailure on error', (done) => {
      const error = new Error('Test error');
      
      actions$ = of(ClaimsActions.loadClaims());
      claimsServiceSpy.getClaims.and.returnValue(throwError(() => error));

      effects.loadClaims$.subscribe(action => {
        expect(action).toEqual(ClaimsActions.loadClaimsFailure({ error: error.message }));
        done();
      });
    });
  });

  describe('createClaim$', () => {
    it('should return createClaimSuccess with claim on successful creation', (done) => {
      actions$ = of(ClaimsActions.createClaim({ claim: mockClaims[0] }));
      claimsServiceSpy.createClaim.and.returnValue(of(mockClaims[0]));

      effects.createClaim$.subscribe(action => {
        expect(action).toEqual(ClaimsActions.createClaimSuccess({ claim: mockClaims[0] }));
        done();
      });
    });

    it('should return createClaimFailure on error', (done) => {
      const error = new Error('Creation failed');
      
      actions$ = of(ClaimsActions.createClaim({ claim: mockClaims[0] }));
      claimsServiceSpy.createClaim.and.returnValue(throwError(() => error));

      effects.createClaim$.subscribe(action => {
        expect(action).toEqual(ClaimsActions.createClaimFailure({ error: error.message }));
        done();
      });
    });
  });

  describe('updateClaimStatus$', () => {
    it('should return updateClaimStatusSuccess with updated claim', (done) => {      
      actions$ = of(ClaimsActions.updateClaimStatus({ 
        claimId: '1', 
        status: ClaimStatus.APPROVED 
      }));
      
      claimsServiceSpy.updateClaimStatus.and.returnValue(of(mockClaims[0]));

      effects.updateClaimStatus$.subscribe(action => {
        expect(action).toEqual(ClaimsActions.updateClaimStatusSuccess({ claim: mockClaims[0] }));
        done();
      });
    });

    it('should return updateClaimStatusFailure on error', (done) => {
      const error = new Error('Update failed');
      
      actions$ = of(ClaimsActions.updateClaimStatus({ 
        claimId: '1', 
        status: ClaimStatus.APPROVED 
      }));
      
      claimsServiceSpy.updateClaimStatus.and.returnValue(throwError(() => error));

      effects.updateClaimStatus$.subscribe(action => {
        expect(action).toEqual(ClaimsActions.updateClaimStatusFailure({ error: error.message }));
        done();
      });
    });
  });
});
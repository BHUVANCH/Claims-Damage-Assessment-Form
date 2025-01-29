import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Observable, delay } from 'rxjs';
import { Claim, ClaimStatus } from './shared-store/claims-store/claims.model';

@Injectable({
  providedIn: 'root',
})
export class ClaimsService {
  private mockClaims: Claim[] = [
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

  private sharedValue = new BehaviorSubject<string>('Initial Value');
  sharedValue$ = this.sharedValue.asObservable();

  setValue(newValue: string) {
    this.sharedValue.next(newValue);
  }

  getClaims() : Observable<Claim[]> {
    return of(this.mockClaims).pipe(delay(500));
  }

  createClaim(claim: Claim): Observable<Claim> {
    const newClaim: Claim = {...claim};
    this.mockClaims = [...this.mockClaims, newClaim];
    return of(newClaim).pipe(delay(500));
  }

  updateClaimStatus(claimId: string, status: ClaimStatus): Observable<Claim> {
    const claim = this.mockClaims.find((c) => c.claimId === claimId);
    if (!claim) {
      throw new Error('Claim not found');
    }

    const updatedClaim = {
      ...claim,
      status,
    };

    this.mockClaims = this.mockClaims.map((claim) =>
      claim.claimId === claimId ? updatedClaim : claim
    );

    return of(updatedClaim).pipe(delay(500));
  }
}

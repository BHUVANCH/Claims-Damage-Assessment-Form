export interface Claim {
    claimId: string;
    policyHolderName: string;
    dateOfIncident: Date;
    damageType: string,
    damageSubType: string,
    damageDescription: string;
    estimatedRepairCost?: number;
    status: ClaimStatus;
    images?: string[];
}
  
  export enum ClaimStatus {
    PENDING = 'Pending',
    UNDER_REVIEW = 'Under Review',
    APPROVED = 'Approved',
    REJECTED = 'Rejected'
  }
  

export interface ClaimsState {
    claims: Claim[];
    selectedClaimId: string | null;
    loading: boolean;
    error: string | null;
  }
  
  export const initialClaimsState: ClaimsState = {
    claims: [],
    selectedClaimId: null,
    loading: false,
    error: null,
  };

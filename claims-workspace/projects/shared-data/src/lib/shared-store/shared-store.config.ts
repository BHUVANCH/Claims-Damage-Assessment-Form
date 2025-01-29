import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { ClaimsEffects } from './claims-store/claims.effects';
import { counterReducer } from './counter-store/counter.reducer';
import { claimsReducer } from './claims-store/claims.reducer';

export const provideSharedStore = () => [
  provideStore({ 
    counter: counterReducer,
    claims: claimsReducer,
  }) 
];

export const provideSharedEffects = () => [
  provideEffects([
    ClaimsEffects
  ])
];

export const provideSharedDevTools = () => [
  provideStoreDevtools({
    maxAge: 25, 
    logOnly: true,
    autoPause: true, 
    trace: false,
    traceLimit: 75, 
    connectInZone: true 
  })
];
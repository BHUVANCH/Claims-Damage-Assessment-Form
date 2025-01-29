import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CounterState } from './counter.model';

export const selectCounterFeature = createFeatureSelector<CounterState>('counter');

export const selectCount = createSelector(
  selectCounterFeature,
  (state) => state.count
);
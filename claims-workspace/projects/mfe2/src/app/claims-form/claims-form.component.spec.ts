import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';

import { ClaimsFormComponent } from './claims-form.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { ClaimStatus, createClaim } from '@shared';
import { ReactiveFormsModule } from '@angular/forms';
import { ClaimsListComponent } from './claims-list/claims-list.component';
import { By } from '@angular/platform-browser';

describe('ClaimsFormComponent', () => {
  let component: ClaimsFormComponent;
  let fixture: ComponentFixture<ClaimsFormComponent>;
  let store: MockStore;
  const initialState = {
    claims: [
      {
        claimId: '1a2b3c',
        policyHolderName: 'John Smith',
        dateOfIncident: new Date('2024-01-15'),
        damageType: 'Vehicle',
        damageSubType: 'Fire',
        damageDescription: 'Front-end damage from collision with guard rail',
        estimatedRepairCost: 3500,
        status: ClaimStatus.PENDING,
      },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClaimsFormComponent, ClaimsListComponent],
      imports: [ReactiveFormsModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
   
    fixture = TestBed.createComponent(ClaimsFormComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // --- Form Validation
  it('should create the form', () => {
    const form = component.form;
    expect(form).toBeTruthy();
  });

  it('should initialaize the from with default values', () => {
    const form = component.form;
    expect(form.get('claimId')?.value).toBe('');
    expect(form.get('policyHolderName')?.value).toBe('');
    expect(form.get('dateOfIncident')?.value).toBe('');
    expect(form.get('damageType')?.value).toBe('');
    expect(form.get('damageSubType')?.value).toBe('');
    expect(form.get('damageDescription')?.value).toBe('');
    expect(form.get('estimatedRepairCost')?.value).toBe(0);
    expect(form.get('status')?.value).toBe(ClaimStatus.PENDING);
  });

  it('should call onSubmit when the form is valid', () => {
    component.form.patchValue(initialState.claims[0]);
    fixture.detectChanges();
    const spy = spyOn(component, 'onSubmit');
    const submitButton = fixture.debugElement.query(
      By.css('button[type="submit"]'),
    ).nativeElement;
    submitButton.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should not call onSubmit when the form is not valid', () => {
    component.form.patchValue(initialState.claims[0]);
    component.form.get('claimId')?.setValue('10');
    fixture.detectChanges();
    const spy = spyOn(component, 'onSubmit');
    const submitButton = fixture.debugElement.query(
      By.css('button[type="submit"]'),
    ).nativeElement;
    submitButton.click();
    expect(spy).not.toHaveBeenCalled();
  });

  // --- Form Submition triggers correct action

  it('should trigger the correct action when form is valid and submitted', fakeAsync(() => {
    component.form.patchValue(initialState.claims[0]);
    component.onSubmit();
    tick();
    flush(); 
    expect(store.dispatch).toHaveBeenCalledWith(
      createClaim({
        claim: {
          ...initialState.claims[0],
          dateOfIncident: new Date('2024-01-15'),
          images: [],
        },
      }),
    );
  }));

  it('should reset form after successful submission', fakeAsync(() => {
    component.form.patchValue(initialState.claims[0]);
    component.onSubmit();
    tick();
    flush();
    expect(component.form.get('status')?.value).toBe(ClaimStatus.PENDING);
    expect(component.form.get('claimId')?.value).toBe(null);
    expect(component.imageFiles.length).toBe(0);
    expect(component.imagePreviews.length).toBe(0);
  }));

  // -- Test Error Messages for Invalid Inputs
  it('should make claimId required and validate its length', () => {
    const claimIdControl = component.form.get('claimId');
    claimIdControl?.setValue('');
    expect(claimIdControl?.errors?.['required']).toBeTruthy();
    claimIdControl?.setValue('12');
    expect(claimIdControl?.errors?.['minlength']).toBeTruthy();
    claimIdControl?.setValue('123');
    expect(claimIdControl?.valid).toBeTruthy();
  });

  it('should make policyHolderName required and validate its length', () => {
    const policyHolderControl = component.form.get('policyHolderName');
    policyHolderControl?.setValue('');
    expect(policyHolderControl?.errors?.['required']).toBeTruthy();
    policyHolderControl?.setValue('A');
    expect(policyHolderControl?.errors?.['minlength']).toBeTruthy();
    policyHolderControl?.setValue('John');
    expect(policyHolderControl?.valid).toBeTrue();
  });

  it('should make damageDescription required and validate its length', () => {
    const descriptionControl = component.form.get('damageDescription');
    descriptionControl?.setValue('');
    expect(descriptionControl?.errors?.['required']).toBeTruthy();
    descriptionControl?.setValue('Too short');
    expect(descriptionControl?.errors?.['minlength']).toBeTruthy();
    descriptionControl?.setValue(
      'This is a valid description of the damage that occurred.',
    );
    expect(descriptionControl?.valid).toBeTrue();
  });

});

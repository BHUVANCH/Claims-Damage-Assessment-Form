import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ClaimStatus, createClaim } from '@shared';
import { catchError, concatMap, forkJoin, from, map, Observable, of, Subject, takeUntil, tap, toArray } from 'rxjs';

@Component({
  selector: 'app-claims-form',
  standalone: false,
  templateUrl: './claims-form.component.html',
  styleUrl: './claims-form.component.css',
})
export class ClaimsFormComponent implements OnInit,OnDestroy{
  damageTypes: any = {
    Vehicle: ['Fire', 'Theft'],
    Property: ['Fire', 'Theft'],
  };
  form!: FormGroup;
  imageFiles: File[] = [];
  imagePreviews: string[] = [];
  statuses = Object.values(ClaimStatus);
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      claimId: ['', [Validators.required, Validators.minLength(3)]],
      policyHolderName: ['', [Validators.required, Validators.minLength(2)]],
      dateOfIncident: ['', Validators.required],
      damageType: ['', Validators.required],
      damageSubType: ['', Validators.required],
      damageDescription: ['', [Validators.required, Validators.minLength(20)]],
      estimatedRepairCost: [0],
      status: [ClaimStatus.PENDING],
    });

    this.form.get('damageType')?.valueChanges.subscribe((type) => {
      this.form.patchValue({ damageSubType: '' });
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      console.log(formValue);
  
      // Convert image files to base64 strings using RxJS
      from(this.imageFiles).pipe(
        // Use concatMap to process each file sequentially (can be replaced with mergeMap for parallel)
        concatMap((file: File) => {
          return new Observable<string>((observer) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              observer.next(reader.result as string); // Emit base64 string
              observer.complete();
            };
            reader.onerror = (error) => {
              observer.error(error); // Handle error
            };
            reader.readAsDataURL(file);
          });
        }),
        // Collect all results into an array (this step waits until all files are processed)
        toArray(),
        // Optionally catch errors during the file reading process
        catchError((error) => {
          console.error('Error during file conversion:', error);
          return []; // Handle errors (return an empty array in case of error)
        }),
        tap((images) => {
          // Dispatch the createClaim action with the images
          this.store.dispatch(
            createClaim({
              claim: {
                ...formValue,
                images, // images is an array of base64 strings
                dateOfIncident: new Date(formValue.dateOfIncident),
              },
            })
          );
  
          // Reset form
          this.form.reset({
            status: ClaimStatus.PENDING,
          });
          this.imageFiles = [];
          this.imagePreviews = [];
        }),
        takeUntil(this.destroy$)
      ).subscribe();
    }
  }

  getSubTypes(): string[] {
    const damageType = this.form.get('damageType')?.value;
    return this.damageTypes[damageType] || [];
  }

  getTypes(): string[] {
    return Object.keys(this.damageTypes);
  }

  onFileDropped(event: DataTransfer) {
    const files = Array.from(event.files);
    this.convertToBase64(files);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.convertToBase64(Array.from(input.files));
    }
  }

  convertToBase64(files: File[]) {
    files.forEach((file) => {
      if (file.type.startsWith('image/')) {
        this.imageFiles.push(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          if (typeof e.target?.result === 'string') {
            this.imagePreviews.push(e.target.result);
            console.log(this.imageFiles);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

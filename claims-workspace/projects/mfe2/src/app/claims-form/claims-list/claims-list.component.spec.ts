import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimsListComponent } from './claims-list.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('ClaimsListComponent', () => {
  let component: ClaimsListComponent;
  let fixture: ComponentFixture<ClaimsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClaimsListComponent],
      imports: [],
      providers: [provideMockStore({  })],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

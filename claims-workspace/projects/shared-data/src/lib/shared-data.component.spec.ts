import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedDataComponent } from './shared-data.component';

describe('SharedDataComponent', () => {
  let component: SharedDataComponent;
  let fixture: ComponentFixture<SharedDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

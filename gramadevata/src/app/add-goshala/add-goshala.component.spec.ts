import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGoshalaComponent } from './add-goshala.component';

describe('AddGoshalaComponent', () => {
  let component: AddGoshalaComponent;
  let fixture: ComponentFixture<AddGoshalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGoshalaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGoshalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

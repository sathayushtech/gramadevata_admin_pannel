import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWelfarehomeComponent } from './add-welfarehome.component';

describe('AddWelfarehomeComponent', () => {
  let component: AddWelfarehomeComponent;
  let fixture: ComponentFixture<AddWelfarehomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddWelfarehomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWelfarehomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

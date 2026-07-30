import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategeoryGurukulComponent } from './add-categeory-gurukul.component';

describe('AddCategeoryGurukulComponent', () => {
  let component: AddCategeoryGurukulComponent;
  let fixture: ComponentFixture<AddCategeoryGurukulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCategeoryGurukulComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCategeoryGurukulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

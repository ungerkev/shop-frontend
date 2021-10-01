import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmLoginComponent } from './adm-login.component';

describe('AdmLoginComponent', () => {
  let component: AdmLoginComponent;
  let fixture: ComponentFixture<AdmLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

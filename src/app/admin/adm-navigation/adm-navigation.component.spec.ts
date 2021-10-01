import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmNavigationComponent } from './adm-navigation.component';

describe('AdmNavigationComponent', () => {
  let component: AdmNavigationComponent;
  let fixture: ComponentFixture<AdmNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPrincipalComponent } from './view-principal.component';

describe('ViewPrincipalComponent', () => {
  let component: ViewPrincipalComponent;
  let fixture: ComponentFixture<ViewPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPrincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

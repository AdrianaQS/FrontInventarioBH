import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalidasComponent } from './salidas.component';

describe('SalidasComponent', () => {
  let component: SalidasComponent;
  let fixture: ComponentFixture<SalidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalidasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
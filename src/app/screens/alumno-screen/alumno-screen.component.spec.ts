import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoScreenComponent } from './alumno-screen.component';

describe('AlumnoScreenComponent', () => {
  let component: AlumnoScreenComponent;
  let fixture: ComponentFixture<AlumnoScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlumnoScreenComponent]
    });
    fixture = TestBed.createComponent(AlumnoScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

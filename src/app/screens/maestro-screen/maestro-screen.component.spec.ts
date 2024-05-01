import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaestroScreenComponent } from './maestro-screen.component';

describe('MaestroScreenComponent', () => {
  let component: MaestroScreenComponent;
  let fixture: ComponentFixture<MaestroScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaestroScreenComponent]
    });
    fixture = TestBed.createComponent(MaestroScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

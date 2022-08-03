import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Error403Component } from './error404.component';

describe('Error404Component', () => {
  let component: Error403Component;
  let fixture: ComponentFixture<Error403Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Error403Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Error403Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

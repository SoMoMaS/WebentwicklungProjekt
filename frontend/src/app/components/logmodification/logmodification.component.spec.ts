import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogmodificationComponent } from './logmodification.component';

describe('LogmodificationComponent', () => {
  let component: LogmodificationComponent;
  let fixture: ComponentFixture<LogmodificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogmodificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogmodificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatelogComponent } from './createlog.component';

describe('CreatelogComponent', () => {
  let component: CreatelogComponent;
  let fixture: ComponentFixture<CreatelogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatelogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatelogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateServerComponent } from './create-server.component';

describe('CreateServerComponent', () => {
  let component: CreateServerComponent;
  let fixture: ComponentFixture<CreateServerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateServerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

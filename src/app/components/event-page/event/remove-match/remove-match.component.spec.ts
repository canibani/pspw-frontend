import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveMatchComponent } from './remove-match.component';

describe('RemoveMatchComponent', () => {
  let component: RemoveMatchComponent;
  let fixture: ComponentFixture<RemoveMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

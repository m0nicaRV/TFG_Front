import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesComponent } from './mes.component';

describe('MesComponent', () => {
  let component: MesComponent;
  let fixture: ComponentFixture<MesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

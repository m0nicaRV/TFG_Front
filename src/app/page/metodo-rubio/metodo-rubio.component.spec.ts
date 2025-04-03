import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetodoRubioComponent } from './metodo-rubio.component';

describe('MetodoRubioComponent', () => {
  let component: MetodoRubioComponent;
  let fixture: ComponentFixture<MetodoRubioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetodoRubioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetodoRubioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

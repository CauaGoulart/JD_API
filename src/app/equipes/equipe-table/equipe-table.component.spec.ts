import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipeTableComponent } from './equipe-table.component';

describe('EquipeTableComponent', () => {
  let component: EquipeTableComponent;
  let fixture: ComponentFixture<EquipeTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EquipeTableComponent]
    });
    fixture = TestBed.createComponent(EquipeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

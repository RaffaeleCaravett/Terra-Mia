import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieroAmatoComponent } from './piero-amato.component';

describe('PieroAmatoComponent', () => {
  let component: PieroAmatoComponent;
  let fixture: ComponentFixture<PieroAmatoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PieroAmatoComponent]
    });
    fixture = TestBed.createComponent(PieroAmatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxsMatSortPluginComponent } from './ngxs-mat-sort-plugin.component';

describe('NgxsMatSortPluginComponent', () => {
  let component: NgxsMatSortPluginComponent;
  let fixture: ComponentFixture<NgxsMatSortPluginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxsMatSortPluginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxsMatSortPluginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

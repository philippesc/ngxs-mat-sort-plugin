import { Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { getValue, Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { UpdateSort } from './actions';

@Directive({
  selector: '[ngxsMatSort]',
})
export class NgxsMatSortDirective implements OnInit, OnDestroy {
  @Input()
  ngxsMatSort: string = 'Sort';

  private destroyed$ = new Subject();

  constructor(private matSort: MatSort, private store: Store) {
    this.initSort();
    this.initSortChange();
  }

  ngOnInit(): void {
    this.getStateStream(this.ngxsMatSort)
      .pipe(
        tap((sort: Sort) => {
          this.matSort.active = sort?.active;
          this.matSort.direction = sort?.direction;
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private initSort() {
    this.getStateStream(this.ngxsMatSort)
      .pipe(
        tap((sort: Sort) => {
          if (sort) {
            this.matSort.active = sort.active;
            this.matSort.direction = sort.direction;
          }
        })
      )
      .subscribe();
  }

  private initSortChange() {
    this.matSort.sortChange
      .pipe(
        takeUntil(this.destroyed$),
        tap((sort) => {
          this.store.dispatch(new UpdateSort(this.ngxsMatSort, sort));
        })
      )
      .subscribe();
  }

  private getStateStream(path: string) {
    return this.store
      .select((state) => getValue(state, path))
      .pipe(takeUntil(this.destroyed$));
  }
}

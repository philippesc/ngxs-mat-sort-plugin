import { Sort } from '@angular/material/sort';

export class UpdateSort {
  static readonly type = '[Sort] Update Sort';

  constructor(public path: string, public sort: Sort) {}
}

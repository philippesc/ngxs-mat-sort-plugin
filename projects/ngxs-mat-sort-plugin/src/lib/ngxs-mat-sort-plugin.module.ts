import { ModuleWithProviders, NgModule } from '@angular/core';
import { NGXS_PLUGINS } from '@ngxs/store';
import { NgxsMatSortPlugin } from './ngxs-mat-sort-plugin';
import { NgxsMatSortDirective } from './ngxs-mat-sort.directive';

@NgModule({
  declarations: [],
  imports: [NgxsMatSortDirective],
  exports: [NgxsMatSortDirective],
})
export class NgxsMatSortPluginModule {
  static forRoot(): ModuleWithProviders<NgxsMatSortPluginModule> {
    return {
      ngModule: NgxsMatSortPluginModule,
      providers: [
        {
          provide: NGXS_PLUGINS,
          useClass: NgxsMatSortPlugin,
          multi: true,
        },
      ],
    };
  }
}

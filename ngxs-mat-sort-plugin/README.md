# NgxsMatSortPlugin

When using [Angular Material sort](https://material.angular.io/components/sort/overview), you need to bind the selected order from the store to the table so you can use it in a [NGXS Selector](https://www.ngxs.io/concepts/select). To make the sorting state persistent beyond a component's lifetime (when the component is destroyed the users selection of sort is also destroyed), you can synchronize the selection to the state with this plugin. This plugin works analogously to [@ngxs/form-plugin](https://www.ngxs.io/plugins/form).

## Installation

```
npm install ngxs-mat-sort-plugin --save

# or if you are using yarn
yarn add ngxs-mat-sort-plugin
```

## Usage

In the root module of your application, import `NgxsMatSortPluginModule` and include it in the imports.

```
import { NgxsMatSortPluginModule } from 'ngxs-mat-sort-plugin';
import { NovelsState } from './novels.state';

@NgModule({
  imports: [
    NgxsModule.forRoot([NovelsState]),
    NgxsMatSortPluginModule.forRoot()
  ]
})
export class AppModule {}
```

If you are using sort in a submodule, it must be imported there as well:

```
import { NgxsMatSortPluginModule } from 'ngxs-mat-sort-plugin';

@NgModule({
  imports: [NgxsMatSortPluginModule]
})
export class SomeModule {}
```

### Sort State

Define your default sort state as part of your application state.

```
import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';

@State<NovelsStateModel>({
  name: "novels",
  defaults: {
    sort: {
        active: "title",
        direction: "asc"
    },
    data: []
  }
})
@Injectable()
export class NovelsState {}
```

### Sort Setup

In your component, you would implement the table and decorate the table with the `ngxsMatSort` directive with the path of your state object where the sort should be located. We are passing the string path to `ngxsMatSort`. The directive uses this path to connect itself to the store and setup bindings.

```
<table matSort mat-table [dataSource]="novels" ngxsMatSort="novels.sort">
...
</table>
```

Now anytime the user changes the sort of this table, your state will also reflect the new sort. When the component is destroyed and initialized again, the sort is binded and instantly restored 🎉.

For making the sort apply you can just use the sort object in your selectors:

```
@Selector()
static novelsSorted(state: NovelsStateModel) {
    if (state.sort.active && state.sort.direction !== "") {
        const novels = Object.assign([], state.data);
        return novels.sort((a, b) => {
            const aValue = (a as any)[state.sort.active];
            const bValue = (b as any)[state.sort.active];
            return (aValue < bValue ? -1 : 1) * (state.sort.direction === "asc" ? 1 : -1);
        });
    } else {
        return state.data;
    }
}
```

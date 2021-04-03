import { Injectable } from "@angular/core";
import { getActionTypeFromInstance, NgxsNextPluginFn, NgxsPlugin, setValue } from "@ngxs/store";
import { UpdateSort } from "./actions";

@Injectable()
export class NgxsMatSortPlugin implements NgxsPlugin {
  handle(state: any, action: any, next: NgxsNextPluginFn) {
    const type = getActionTypeFromInstance(action);

    let nextState = state;

    if (type === UpdateSort.type) {
      const { sort, path } = action;
      nextState = setValue(nextState, path, sort);
    }

    return next(nextState, action);
  }
}

import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { loginInit, login } from "./counter.actions";
import { map } from "rxjs";


export default class CounterEffects {
  private actions$:Actions<Action<string>> = inject(Actions)

  readonly login = createEffect(() => 
  this.actions$.pipe(
    ofType(loginInit),
    map((action) => login(({ user: action.user })))
  ))


}
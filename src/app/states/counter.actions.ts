import { createAction, props } from "@ngrx/store";
import { UserModel } from "./counter.model";

export const loginInit = createAction('[User] Login Init', props<{ user: UserModel }>());

export const login = createAction('[User] Login Ok', props<{ user: UserModel }>());

export const logout = createAction('[User] Logout');
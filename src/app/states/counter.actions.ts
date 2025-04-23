import { createAction, props } from "@ngrx/store";
import { UserModel } from "./counter.model";

export const login = createAction('[User] Login', props<{ user: UserModel }>());

export const logout = createAction('[User] Logout');
import { inject } from "@angular/core";
import { SpinnerService } from "./spinner.service";
import { finalize } from "rxjs";
import { HttpInterceptorFn } from "@angular/common/http";

export const SpinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const spinnerServ = inject(SpinnerService);
  spinnerServ.show();

  return next(req).pipe(
    finalize(() => {
      spinnerServ.hide();
    })
  );
};
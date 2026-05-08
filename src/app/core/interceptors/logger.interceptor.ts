import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs';

export const loggerInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(`[HTTP] → ${req.method} ${req.url}`);
  return next(req).pipe(
    tap(event => {
      if (event instanceof HttpResponse) {
        console.log(`[HTTP] ← ${event.status} ${req.url}`);
      }
    })
  );
};
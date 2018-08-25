import { Injectable, Inject, PLATFORM_ID  } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptorService implements HttpInterceptor{

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
      // Client only code.
      if (isPlatformBrowser(this.platformId)) {
          let token = localStorage.getItem('access_token');
          if (token) {
              request = request.clone({
                  setHeaders: {
                      Authorization: `Bearer ${token}`,
                  }
              });
          }
      }

    return next.handle(request);
  }
}


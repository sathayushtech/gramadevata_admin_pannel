import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
// import { AuthenticationService } from '../services/authenticationservice/authentication.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { catchError, switchMap ,throwError} from 'rxjs';
import { jwtDecode } from 'jwt-decode';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

 const authenticationService = inject(AuthenticationService);
  const token = authenticationService.getAccessToken();

  const normalizedUrl = req.url.toLowerCase();

  const excludedUrlsForGetRequests = [
    'templemain',
    'goshalamain',
    'eventmain',
    'home',
    'temple',
    'templecategory',
    'templepriority',
    'block',
    'country',
    'district',
    'state',
    'village',
    'goshala',
    'goshalaCategory',
    'event',
    'eventcategory',
  ];

  const excludedUrlsForPost = [
    'token/refresh',
    'register',
    'verify',
    'resend',
    'login',
    'forgot-password',
    'verify-forgot-password',
  ];

  const excludedUrls = req.method === 'GET' ? excludedUrlsForGetRequests : excludedUrlsForPost;

  if (excludedUrls.some((url) => normalizedUrl.includes(url))) {
    return next(req);
  }

  if (!token) {
    return next(req);
  }

  try {
    const decodedToken: any = jwtDecode(token);
    const expiration = decodedToken?.exp;
    const isExpired = typeof expiration === 'number' ? expiration < Date.now() / 1000 : false;

    if (!isExpired) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next(authReq);
    }

    const refreshToken = authenticationService.getRefreshToken();
    if (!refreshToken) {
      authenticationService.logout();
      return next(req);
    }

    return authenticationService.refreshToken(refreshToken).pipe(
      switchMap((res: any) => {
        authenticationService.persistAuthTokens(res);
        const refreshedToken = authenticationService.getAccessToken();
        const authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${refreshedToken ?? token}`,
          },
        });
        return next(authReq);
      }),
      catchError((err) => {
        authenticationService.logout();
        return throwError(() => err);
      })
    );
  } catch (e) {
    authenticationService.logout();
    return next(req);
  }
};

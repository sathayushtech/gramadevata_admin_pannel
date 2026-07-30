import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component'; 
import { UserService } from './user.service';
import { URL } from '../../constant';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isLoggedIn = false;

  constructor(private httpClient: HttpClient,
              private router:Router,
              private dialog:MatDialog,
              private userservice:UserService,

  ) {
    let user = localStorage.getItem('user');
    this.isLoggedIn = user != null;
   }




   isLoggedInUser() {
    return this.isLoggedIn;
  }

  // logout() {
  //   localStorage.clear();
  //   this.isLoggedIn = false;
  //   this.userservice.isMemberIn = false;
    
  //   this.router.navigate(['temples'])
  //   localStorage.removeItem('profile_pic');

     
    
  // }

  showLoginModal(): void {
    this.openSignupDialog();
  }

  openSignupDialog(): void {
    const dialogRef = this.dialog.open(SignupComponent, {
      data: { displayName: 'signup' }, 
      autoFocus: false, 
      backdropClass: 'dialog-backdrop',
    });
    
    dialogRef.afterClosed().subscribe(() => {
      
    });
  }

  getCurrentUser() {
    return localStorage.getItem('user');
  }


  refreshToken(refreshToken:any) {
    return this.httpClient.post(URL + 'token/refresh', {
      refresh: refreshToken,
    });
  }



    setLoggedInState(isLoggedIn: boolean): void {
    this.isLoggedIn = isLoggedIn;
  }

  getAccessToken(): string | null {
    return localStorage.getItem('token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh');
  }

  persistAuthTokens(response: any): void {
    const accessToken = response?.access ?? response?.access_token ?? response?.token ?? null;
    const refreshToken = response?.refresh ?? response?.refresh_token ?? null;

    if (accessToken) {
      localStorage.setItem('token', accessToken);
    }

    if (refreshToken) {
      localStorage.setItem('refresh', refreshToken);
    }

    if (response?.user_id) {
      localStorage.setItem('user', response.user_id);
    }

    if (response?.username) {
      localStorage.setItem('username', response.username);
    }

    if (response?.is_member !== undefined && response?.is_member !== null) {
      localStorage.setItem('is_member', response.is_member);
    }

    if (response?.type) {
      localStorage.setItem('type', response.type);
    }

    if (response?.profile_pic) {
      localStorage.setItem('profile_pic', response.profile_pic);
    }

    if (response?.full_name) {
      localStorage.setItem('full_name', response.full_name);
    }

    this.isLoggedIn = true;
  }

  logout(redirectToHome = true) {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    localStorage.removeItem('is_member');
    localStorage.removeItem('type');
    localStorage.removeItem('profile_pic');
    localStorage.removeItem('full_name');
    localStorage.removeItem('user_id');

    this.isLoggedIn = false;
    this.userservice.isMemberIn = false;
    this.userservice.isPujariIn = false;
    // this.userservice.isvolunary = false;
    // this.spinner?.hide();

    if (redirectToHome) {
      this.router.navigateByUrl('/home', { replaceUrl: true });
    }
  }
  
}

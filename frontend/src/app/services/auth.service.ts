import {Injectable, Injector} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';


@Injectable()
export class AuthService {
  public isAuthenticated: boolean = false;

  constructor(private inj: Injector,
              private router: Router) {

  }

  private setAuthKey(authKey) {
    localStorage.setItem('auth_key', authKey);
  }

  private setUserId(authKey) {
    localStorage.setItem('user_id', authKey);
  }

  public isLoggedIn() {
    return this.getAuthKey() != null;
  }

  public logout() {
    localStorage.removeItem('auth_key');
    localStorage.removeItem('user_id');
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  public getAuthKey() {
    return localStorage.getItem('auth_key');
  }

  public getUserId() {
    return localStorage.getItem('user_id');
  }

  public login(requestData) {
    const http = this.inj.get(HttpClient);
    return new Promise((resolve) => {

      http.post('http://api.movies-backend.test/v1/site/login', requestData).subscribe(
        (data) => {
          if (data['status'] === 200) {
            this.isAuthenticated = true;
            this.setAuthKey(data['data']['token']);
            this.setUserId(data['data']['id']);
          }
          resolve(data);
        },
        (error) => {
          resolve(error);
        }
      );
    });
  }
}

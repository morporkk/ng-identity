import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public createEmail: string;
  public createPassword: string;
  public signInEmail: string;
  public signInPassword: string;
  public jwt: string;

  constructor(private http: HttpClient) { }

  createAccount() {

    let credentials = {
      email: this.createEmail,
      password: this.createPassword
    }

    this.http.post('http://localhost:3000/users', credentials).subscribe((res) => {
      console.log(res);
    });

  }

  signIn() {

    let credentials = {
      email: this.signInEmail,
      password: this.signInPassword
    }

    this.http.post('http://localhost:3000/auth', credentials).subscribe((res: any) => {
      console.log(res);
      this.jwt = res.token;
      localStorage.setItem('token', res.token);
      localStorage.setItem('expires', res.expiresIn);
    });

  }

  testRoute() {

    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.jwt)

    this.http.get('http://localhost:3000/users/test', { headers: headers }).subscribe((res) => {
      console.log(res);
    });

  }

  logout() {
    this.jwt = null;
  }

}

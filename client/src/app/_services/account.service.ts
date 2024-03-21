import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/'
  private curentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.curentUserSource.asObservable();

  constructor(private http:HttpClient) { }

  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.curentUserSource.next(user);
        }
        // return user;
      })
    )
  }

  register(model: any){
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map(user => {
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.curentUserSource.next(user);
        }
        // return user;
      })
    )
  }

  setCurrentUser(user: User){
    this.curentUserSource.next(user);
  }

  
  logout() {
    localStorage.removeItem('user');
    this.curentUserSource.next(null);
  }
}

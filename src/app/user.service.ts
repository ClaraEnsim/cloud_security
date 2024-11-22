import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  updateUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users = [{ username: 'user1', email: 'email1', password: 'password1' }];

  generateVerificationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Code à 6 chiffres
  }

  sendVerificationEmail(email: string, code: string) {
    console.log(`Code de vérification envoyé à ${email} : ${code}`);
    // Remplace par une implémentation réelle d'envoi d'email si nécessaire
  }

  registerUser(username: string, email: string, password: string) {
    this.users.push({ username, email, password });
    console.log("Utilisateur enregistré :", { username, email });
  }

  login(username: string, password: string): boolean {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    }
    return false;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  updateUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem('user');
  }
}

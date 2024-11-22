import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username = '';
  email = '';
  confirmEmail = '';
  password = '';
  verificationCode = '';
  generatedCode = '';
  verificationMode = false;
  errorMessage = '';
  isCodeSent= true;
  ConfimationEmail= true


  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    if (this.email !== this.confirmEmail) {
      this.errorMessage = "Les emails ne correspondent pas.";
      return;
    }

    this.generatedCode = this.authService.generateVerificationCode();
    this.authService.sendVerificationEmail(this.email, this.generatedCode);
    this.verificationMode = true;
    this.errorMessage = '';
  }

  onVerifyCode() {
    if (this.verificationCode === this.generatedCode) {
      this.authService.registerUser(this.username, this.email, this.password);
      this.router.navigate(['/login']);
    } else {
      this.errorMessage = "Erreur de code, veuillez réessayer.";
    }
  }
}

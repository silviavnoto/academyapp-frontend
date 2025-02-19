import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { SessionService } from '../../service/session.service';
import { CryptoService } from '../../service/crypto.service';

@Component({
  selector: 'app-login',
  templateUrl: './shared.login.routed.html',
  styleUrls: ['./shared.login.routed.css'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class SharedLoginRoutedComponent implements OnInit {

  errorMessage: string | null = null;

  loginForm: FormGroup = new FormGroup({});

  constructor(
    private oLoginService: LoginService,
    private oSessionService: SessionService,
    private oRouter: Router,
    private oCryptoService: CryptoService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    });


  }

  ngOnInit(): void { }

  onSubmit() {
    if (this.loginForm.valid) {
      const hashedPassword = this.oCryptoService.getHashSHA256(this.loginForm.value.password);
      this.oLoginService.login(this.loginForm.value.email, hashedPassword).subscribe({
        next: (token: string) => {

          alert('Inicio de sesión exitoso');

          this.oSessionService.login(token);
          this.oRouter.navigate(['/']);

          //let parsedToken: IJwt;
          //parsedToken = this.oSessionService.parseJwt(token);
          //console.log('Token parseado:', parsedToken);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error al realizar la solicitud', error);
          alert('Correo o contraseña incorrectos');
          this.errorMessage = 'Correo o contraseña incorrectos';
        }
      });
    }
  }

  onAdmin() {
    this.loginForm.setValue({
      email: 'emailRosa3517@gmail.com',
      password: 'ausias'
    });
  }

  onContable() {
    this.loginForm.setValue({
      email: 'emailRafa2149@gmail.com',
      password: 'ausias'
    });
  }

  onAuditor() {
    this.loginForm.setValue({
      email: 'emailIgnacio8900@gmail.com',
      password: 'ausias'
    });
  }


}
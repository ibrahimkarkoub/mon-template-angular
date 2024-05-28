import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userName: any;
  password: any;
  constructor(private loginService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  token: any;
  login() {
    this.loginService
      .loginService({ userName: this.userName, password: this.password })
      .subscribe((res) => {
        console.log(res);
        this.token = res;
        localStorage.setItem('token', this.token.accessToken);
        this.router.navigateByUrl('taches');
      },err=>{
        Swal.fire({
          title: 'Erreur !',
          text: "identifant ou le mot de passe est incorrect !",
          icon: 'error',
          timer: 4000,
          timerProgressBar: true,
          showConfirmButton: false
        });
      });
  }
}

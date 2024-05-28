import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  username: any;
  constructor(private userService: UsersService) {}
  wait = false;
  ngOnInit(): void {}

  changePassword() {
    this.wait = true
    this.userService.forgetPasword(this.username).subscribe((res) => {

      Swal.fire({
        title: 'Succès !',
        text: 'Check your mail',
        icon: 'success',
        timer: 4000,
        timerProgressBar: true,
        showConfirmButton: false
      }).then(() => {
        this.wait = false
        this.username = ''
      })
    }
  ,err=>{
    Swal.fire({
      title: 'Erreur !',
      text: "l'identifiant est incorrect !",
      icon: 'error',
      timer: 4000,
      timerProgressBar: true,
      showConfirmButton: false
    }).then(()=>{
      this.wait = false
    })
  });
  }
}

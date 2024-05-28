import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { UsersService } from 'src/app/core/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  newPassword:any
  confirm :any
  user : any
  constructor(
    private userService : UsersService,
    private authService : AuthService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.authService.decodeTokenAfterLogin().subscribe(res=>{
      this.user = res
    })
  }

  changePass(){
    if(this.confirm != this.newPassword){
      Swal.fire({
        title: 'Erreur !',
        text: "le mot de passe est incorrect !",
        icon: 'error',
        timer: 4000,
        timerProgressBar: true,
        showConfirmButton: false
      });
    }else{
      this.userService.changePassword({"newPassword" : this.newPassword} , this.user.id).subscribe(res=>{
        Swal.fire({
          title: 'Succès !',
          text: 'le mot de passe a été changer avec succès.',
          icon: 'success',
          timer: 4000,
          timerProgressBar: true,
          showConfirmButton: false
        }).then(() => {
          localStorage.clear()
          this.router.navigateByUrl("auth/login")
        })

      })
    }

  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogViewUserComponent } from '../dialog-view-user/dialog-view-user.component';
import { UsersService } from 'src/app/core/services/users.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste-user',
  templateUrl: './liste-user.component.html',
  styleUrls: ['./liste-user.component.scss']
})
export class ListeUserComponent implements OnInit {

  users: any

  constructor(
    private dialog: MatDialog,
    private usersService: UsersService,
    private authService : AuthService,
    private router : Router
  ) { }
  user : any
  ngOnInit(): void {
    this.authService.decodeTokenAfterLogin().subscribe(res=>{
      this.user = res
      if(this.user.role != 'ADMIN'){
        console.log("FFFFFFFFF");

        this.router.navigateByUrl('taches')
      }
    })
    this.getUsers()
  }

  getUsers() {
    this.usersService.getAllUsers().subscribe(res => {
      this.users = res
      this.users.reverse()
    })
  }


  openDialogAddUser() {
    const dialogRef = this.dialog.open(DialogAddUserComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getUsers()
    });
  }

  openDialogEditUser(data: any) {
    const dialogRef = this.dialog.open(DialogEditUserComponent, {
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getUsers()
    });
  }

  openDialogViewUser() {
    this.dialog.open(DialogViewUserComponent, {
      maxHeight: '80vh'
    });
  }

  delete(item: any) {
    Swal.fire({
      title: "Êtes-vous sûr(e) ?",
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimer !"
    }).then((result) => {
      if (result.isConfirmed) {
        this.usersService.deleteUser(item).subscribe(res => {
          Swal.fire({
            title: "Supprimé !",
            text: "Le utilisateur a été supprimé.",
            icon: "success"
          }).then(() => {
            this.getUsers()
          })
        },err=>{
          Swal.fire({
            title: 'Erreur !',
            text: "Vous ne pouvez pas supprimer ce utilisateur.",
            icon: 'error',
            timer: 4000,
            timerProgressBar: true,
            showConfirmButton: false
          });
        })
      }
    });
  }


}

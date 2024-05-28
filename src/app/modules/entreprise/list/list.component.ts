import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from 'src/app/core/services/users.service';
import { AddComponent } from '../add/add.component';
import { EditComponent } from '../edit/edit.component';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  users: any
  me : any
  constructor(
    private dialog: MatDialog,
    private usersService: UsersService,
    private authService : AuthService
  ) { }

  ngOnInit(): void {


    this.authService.decodeTokenAfterLogin().subscribe((res) => {
      this.me = res;
      console.log(res);

      this.getUsers();
    });
  }

  getUsers() {
    this.usersService.getEmployeeByEmt(this.me.id).subscribe(res => {
      this.users = res
      console.log(res);
      this.users = this.users.filter((i:any)=>{
        return i.role == "Employe"
      })

      this.users.reverse()
    })
  }


  openDialogAddUser() {
    const dialogRef = this.dialog.open(AddComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getUsers()
    });
  }

  openDialogEditUser(data: any) {
    const dialogRef = this.dialog.open(EditComponent, {
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getUsers()
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
        })
      }
    });
  }


}

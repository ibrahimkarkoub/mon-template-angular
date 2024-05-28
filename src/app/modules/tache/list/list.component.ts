import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AddComponent } from '../add/add.component';
import { EditComponent } from '../edit/edit.component';
import { TacheService } from 'src/app/core/services/tache.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  taches: any;
user : any
  constructor(
    private dialog: MatDialog,
    private tacheService: TacheService,
    private authService: AuthService,
    private router : Router
  ) {}
  ngOnInit(): void {
    this.getCurrentUser()
    
  }
  getCurrentUser() {
    this.authService.decodeTokenAfterLogin().subscribe((res) => {
      this.user = res
      this.getAll();
      if(this.user.role == 'ADMIN'){
        console.log("FFFFFFFFF");

        this.router.navigateByUrl('liste-user')
      }
    });
  }
  getAll() {
    this.tacheService.getAll().subscribe((res) => {
      this.taches = res;
      this.taches = this.taches.filter((i:any)=>{
        return i.active !== false
      })
      this.taches = this.taches.filter((i:any)=>{
        return i.createur.id == this.user.id
      })

      console.log(res);
    });
  }

  openDialogAdd() {
    const dialogRef = this.dialog.open(AddComponent, {});
    dialogRef.afterClosed().subscribe((result) => {
      this.getAll();
    });
  }

  openDialogEdit(data: any) {
    const dialogRef = this.dialog.open(EditComponent, {
      data: data,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAll();
    });
  }

  delete(item: any) {
    Swal.fire({
      title: 'Êtes-vous sûr(e) ?',
      text: 'Vous ne pourrez pas revenir en arrière !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer !',
    }).then((result) => {
      if (result.isConfirmed) {
        this.tacheService.delete(item).subscribe(res => {
          Swal.fire({
            title: "Supprimé !",
            text: "Le utilisateur a été supprimé.",
            icon: "success"
          }).then(() => {
            this.getAll()
          })
        })
      }
    });
  }

  cloturer(item: any) {
    Swal.fire({
      title: 'Êtes-vous sûr(e) ?',
      text: 'Vous ne pourrez pas revenir en arrière !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, DONE !',
    }).then((result) => {
      if (result.isConfirmed) {
        this.tacheService.colturer(item).subscribe((res) => {
          Swal.fire({
            title: 'DONE !',
            text: 'Taks completed successfully.',
            icon: 'success',
          }).then(() => {
            this.getAll();
          });
        },err=>{
          window.location.reload()
        });
      }
    });
  }
}

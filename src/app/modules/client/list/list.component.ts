import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/core/services/client.service';
import Swal from 'sweetalert2';
import { AddComponent } from '../add/add.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  clients : any
  constructor(
    private clientService : ClientService,
    private dialog: MatDialog,
    private router : Router,
    private authService : AuthService
  ) { }
  user:any
  ngOnInit(): void {
    this.authService.decodeTokenAfterLogin().subscribe(res=>{
      this.user = res
      this.getAll()
      if(this.user.role == 'ADMIN' ){
        console.log("FFFFFFFFF");

        this.router.navigateByUrl('liste-user')
      }
      if(this.user.role == 'Employe' ){
        console.log("FFFFFFFFF");

        this.router.navigateByUrl('taches')
      }
    })
   
  }

  getAll(){
    this.clientService.getAll().subscribe(res=>{
      this.clients = res
      console.log(res)
      this.clients = this.clients.filter((i: any) => {

        return i.preContrat.prospect.utilisateur.entreprise.id == this.user.id

      })
    })
  }

  openDialogAdd(){
    const dialogRef = this.dialog.open(AddComponent, {});
    dialogRef.afterClosed().subscribe((result) => {
      this.getAll();
    })
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
        this.clientService.delete(item).subscribe(res=>{
          Swal.fire({
            title: "Supprimé !",
            text: "Le client a été supprimé.",
            icon: "success"
          }).then(() => {
            this.getAll()
          })
        })
      }
    });
  }

}

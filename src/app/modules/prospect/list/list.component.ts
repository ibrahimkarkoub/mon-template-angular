import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from '../add/add.component';
import { EditComponent } from '../edit/edit.component';
import Swal from 'sweetalert2';
import { ProspectService } from 'src/app/core/services/prospect.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  prospects : any
  constructor(
    private dialog: MatDialog,
    private prospectService : ProspectService,
    private authService : AuthService,
    private router : Router
  ) { }
  ngOnInit(): void {
  
    this.getCurrentUser()
  }
  user :any
  getCurrentUser(){
    this.authService.decodeTokenAfterLogin().subscribe(res=>{
      this.user = res
      this.getAll()
      console.log("======",this.user)
      if(this.user.role == 'ADMIN'){
        console.log("FFFFFFFFF");

        this.router.navigateByUrl('liste-user')
      }

      if(this.user.role == 'ENTREPRISE'){
        console.log("FFFFFFFFF");

        this.router.navigateByUrl('clients')
      }


    })
  }

  getAll(){
    this.prospectService.getAll().subscribe(res=>{
      this.prospects = res
      console.log(this.prospects);
      
  

    
      this.prospects = this.prospects.filter((i:any)=>{
        
          return i.utilisateur.id == this.user.id
        
      })
      console.log(this.prospects);

    })
  }

  openDialogAdd() {
    const dialogRef = this.dialog.open(AddComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAll()
    });
  }

  openDialogEdit(data: any) {
    const dialogRef = this.dialog.open(EditComponent, {
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAll()
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
        this.prospectService.deleteProspect(item).subscribe(res=>{
          this.getAll()
        })
      }
    });
  }

}

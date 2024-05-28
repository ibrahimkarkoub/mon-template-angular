import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from '../add/add.component';
import { EditComponent } from '../edit/edit.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  provenance : any
  constructor(    private dialog: MatDialog,) { }
  ngOnInit(): void {
    this.getAll()
  }

  getAll(){

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
        // this.usersService.deleteUser(item).subscribe(res => {
        //   Swal.fire({
        //     title: "Supprimé !",
        //     text: "Le utilisateur a été supprimé.",
        //     icon: "success"
        //   }).then(() => {
        //     this.getAll()
        //   })
        // })
      }
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from '../add/add.component';
import { EditComponent } from '../edit/edit.component';
import Swal from 'sweetalert2';
import { PrecontratService } from 'src/app/core/services/precontrat.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  precontrats: any;
  constructor(
    private dialog: MatDialog,
    private precontratService: PrecontratService,
    private authService: AuthService,
    private router: Router
  ) { }
  user: any
  ngOnInit(): void {
    this.authService.decodeTokenAfterLogin().subscribe(res => {
      this.user = res
      this.getAll();
      if (this.user.role == 'ADMIN') {
        console.log("FFFFFFFFF");

        this.router.navigateByUrl('liste-user')
      }
      if (this.user.role == 'Employe') {
        console.log("FFFFFFFFF");

        this.router.navigateByUrl('taches')
      }
    })
    
  }

  getAll() {
    this.precontratService.getAll().subscribe((res) => {
      this.precontrats = res
      this.precontrats = this.precontrats.filter((i: any) => {

        return i.prospect.utilisateur.entreprise.id == this.user.id

      })

      console.log("00000000", this.precontrats)
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
        this.precontratService.delete(item).subscribe(res => {
          Swal.fire({
            title: "Supprimé !",
            text: "Le pre contrat a été supprimé.",
            icon: "success"
          }).then(() => {
            this.getAll()
          })
        })
      }
    });
  }
}

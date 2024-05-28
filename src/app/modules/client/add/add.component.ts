import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ClientService } from 'src/app/core/services/client.service';
import { PrecontratService } from 'src/app/core/services/precontrat.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  precontrat:any
  precontratAll : any
  constructor(
    private precontratService : PrecontratService ,
    private clientSerivice : ClientService,
    public dialogRef: MatDialogRef<AddComponent>
  ) { }

  ngOnInit(): void {
    this.getAllProspect()
  }

  getAllProspect(){
    this.precontratService.getAll().subscribe(res=>{
      this.precontratAll = res
    })
  }

  submit(){
    this.clientSerivice.add(this.precontrat).subscribe(res=>{
      this.dialogRef.close()
    },err=>{
      Swal.fire({
        title: 'Erreur !',
        text: "Le client est déjà existe.",
        icon: 'error',
        timer: 4000,
        timerProgressBar: true,
        showConfirmButton: false
      });
    },)
  }

}

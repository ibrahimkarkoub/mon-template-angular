import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { PrecontratService } from 'src/app/core/services/precontrat.service';
import { ProspectService } from 'src/app/core/services/prospect.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  allProspect:any
  prospect:any
  constructor(
    private prospectService : ProspectService,
    private preContratService : PrecontratService,
    public dialogRef: MatDialogRef<AddComponent>,
    private authService : AuthService
  ) { }

  user:any

  ngOnInit(): void {
    this.authService.decodeTokenAfterLogin().subscribe(res=>{
      this.user = res
      this.getAllProspect()
    })
    console.log("EEEEEEEEEEEEEEEEEEEE");

  }

  getAllProspect(){
    this.prospectService.getAll().subscribe(res=>{
      this.allProspect = res
      console.log(this.allProspect);
      
      this.allProspect = this.allProspect.filter((i:any)=>{
        return i.active == true
      })

      this.allProspect = this.allProspect.filter((i:any)=>{
        
        return i.utilisateur.entreprise.id == this.user.id
      
    })

    })
  }

  submit(){
    this.preContratService.add(this.prospect).subscribe(res=>{
     this.dialogRef.close()
    },err=>{
      Swal.fire({
        title: 'Erreur !',
        text: "Le precontrat est déjà existe.",
        icon: 'error',
        timer: 4000,
        timerProgressBar: true,
        showConfirmButton: false
      });
    })
  }

}

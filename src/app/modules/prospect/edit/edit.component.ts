import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from 'src/app/core/services/users.service';
import { DialogEditUserComponent } from '../../user-management/components/dialog-edit-user/dialog-edit-user.component';
import { Prospect } from 'src/app/core/model/prospect';
import { ProspectService } from 'src/app/core/services/prospect.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  prospect = new Prospect()
  constructor(
    private prospectService : ProspectService,
    private authServuce : AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UsersService,
    public dialogRef: MatDialogRef<DialogEditUserComponent>
  ) { }
  user:any
  ngOnInit(): void {
    this.authServuce.decodeTokenAfterLogin().subscribe(res=>{
      this.user = res
      console.log(res);

    })
    this.prospect = this.data
    console.log(this.data);

  }

  ajouter(){
    this.prospect.reseauxSociaux = this.prospect.provenance.reseauxSociaux
    this.prospect.description = this.prospect.provenance.description
    this.prospectService.edit(this.prospect.id , this.prospect).subscribe(res=>{
      this.dialogRef.close()
    })
  }
}

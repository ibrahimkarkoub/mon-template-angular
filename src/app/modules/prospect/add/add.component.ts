import { ProspectService } from 'src/app/core/services/prospect.service';
import { Prospect } from './../../../core/model/prospect';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  id = 1
  constructor(
    private prospectService : ProspectService,
    private authServuce : AuthService,
    public dialogRef: MatDialogRef<AddComponent>
  ) { }
  user : any
  prospect= new Prospect()
  ngOnInit(): void {
    this.authServuce.decodeTokenAfterLogin().subscribe(res=>{
      this.user = res
      console.log(res);

    })
  }

  ajouter(){
    this.prospectService.add(this.user.id , this.prospect).subscribe(res=>{
      this.dialogRef.close()
    })
  }

}

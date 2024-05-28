import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Tache } from 'src/app/core/model/tache';
import { TacheService } from 'src/app/core/services/tache.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  tache = new Tache()
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UsersService,
    public dialogRef: MatDialogRef<EditComponent>,
    private tacheService : TacheService
  ) { }

  ngOnInit(): void {
    this.tache = this.data
  }
  submit(){
    this.tacheService.edit(this.tache , this.tache.id).subscribe(res=>{
      this.dialogRef.close()
    })
  }
}

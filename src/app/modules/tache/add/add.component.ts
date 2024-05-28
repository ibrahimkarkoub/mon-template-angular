import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Tache } from 'src/app/core/model/tache';
import { AuthService } from 'src/app/core/services/auth.service';
import { TacheService } from 'src/app/core/services/tache.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  users: any;
  me: any;
  tache = new Tache()
  constructor(
    private userService: UsersService,
    private tacheSerivce: TacheService,
    private authService: AuthService,
    public dialogRef: MatDialogRef<AddComponent>
  ) {}

  ngOnInit(): void {
    this.authService.decodeTokenAfterLogin().subscribe((res) => {
      this.me = res;
      console.log(res);

      this.getAllUsers();
    });
  }
  selectUs: any;
  selectUser() {
    console.log(this.selectUs);
  }

  getAllUsers() {
    this.userService.getEmployeeByEmt(this.me.id).subscribe((res) => {
      this.users = res;
    });
  }

  submit() {
    this.tacheSerivce.add(this.tache , this.me.id , this.selectUs).subscribe(res=>{
      console.log(res);
      this.dialogRef.close()
    })
  }
}

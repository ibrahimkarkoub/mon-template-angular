import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from 'src/app/core/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UsersService,
    public dialogRef: MatDialogRef<EditComponent>
  ) { }

  userForm!: FormGroup;

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      id: [this.data.id],
      firstName: [this.data.firstName, Validators.required],
      lastName: [this.data.lastName, Validators.required],
      userName: [this.data.userName],
      email: [this.data.email, [Validators.required, Validators.email]],
      phoneNumber: [this.data.phoneNumber, Validators.required],
      role: [this.data.role],
      password: [this.data.password],
      entreprise : [this.data.entreprise]

    });
  }

  onSubmit() {
    this.userService.updateUser(this.data.id , this.userForm.value).subscribe(res=>{
      Swal.fire({
        title: 'Succès !',
        text: 'L\'utilisateur a été modifié avec succès.',
        icon: 'success',
        timer: 4000,
        timerProgressBar: true,
        showConfirmButton: false
      }).then(()=>{
        this.dialogRef.close()
      })
    },error=>{
      Swal.fire({
        title: 'Erreur !',
        text: "quelque chose s'est mal passé.",
        icon: 'error',
        timer: 4000,
        timerProgressBar: true,
        showConfirmButton: false
      });
    })
  }

}

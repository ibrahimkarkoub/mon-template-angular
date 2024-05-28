import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http : HttpClient
  ) { }

  getAllUsers(){
    return this.http.get("http://localhost:8081/users/getAll")
  }

  getEmployeeByEmt(id:any){
    return this.http.get("http://localhost:8081/users/getEmployeesByEntrepriseId/"+id)
  }

  deleteUser(id : any){
    return this.http.delete("http://localhost:8081/users/deleteUser/"+id)
  }

  updateUser(id : any , data : any){
    return this.http.put("http://localhost:8081/users/updateUser/"+id , data)
  }

  changePassword(data:any , id :any){
    return this.http.put('http://localhost:8081/users/changePassword/'+id , data)
  }

  forgetPasword(username:any){
    return this.http.get('http://localhost:8081/users/forgetPassword/'+username)
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private http : HttpClient
  ) { }


  getAll(){
    return this.http.get("http://localhost:8081/clients/getAll")
  }


  add(id:any){
    return this.http.post("http://localhost:8081/clients/create/"+id , {})
  }

  delete(id:any){
    return this.http.delete("http://localhost:8081/clients/delete/"+id)
  }
}

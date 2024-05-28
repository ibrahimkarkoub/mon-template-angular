import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProspectService {

  constructor(
    private http : HttpClient
  ) { }

  getAll(){
    return this.http.get("http://localhost:8081/prospects/getAll")
  }

  add(id:any , data:any){
    return this.http.post("http://localhost:8081/prospects/add/"+id , data)
  }
  edit(id:any , data:any){
    return this.http.put("http://localhost:8081/prospects/update/"+id , data)
  }

  deleteProspect(id:any){
    return this.http.delete('http://localhost:8081/prospects/delete/'+id)
  }
}

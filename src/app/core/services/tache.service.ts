import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TacheService {

  constructor(
    private http : HttpClient
  ) { }

  getAll(){
    return this.http.get("http://localhost:8081/taches/getAll")
  }
  add(data:any , me : any , to : any){
    return this.http.post("http://localhost:8081/taches/add/"+to+"/"+me , data)
  }

  edit(data:any , id : any){
    return this.http.put("http://localhost:8081/taches/update/"+id , data)
  }
  delete( id : any){
    return this.http.delete("http://localhost:8081/taches/delete/"+id )
  }

  colturer(id : any){
    return this.http.put("http://localhost:8081/taches/cloturer/"+id , {})
  }
}

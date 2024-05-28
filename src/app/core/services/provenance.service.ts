import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProvenanceService {

  constructor(
    private http :HttpClient
  ) { }

  getAll(){
    this.http.get("")
  }
}

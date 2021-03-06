import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { category } from './category';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class CategorydataService {
  constructor(private http: HttpClient) { }

  url: string = environment.db + 'category/';

  getAllCategory() {
    return this.http.get(this.url);
  }

  deleteCategory(c_id: number) {
    let x = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete(this.url + c_id, { headers: x });
  }

  addCategory(item: category) {
    let body = JSON.stringify(item);
    let x = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url, body, { headers: x });
  }

  editCategory(c_id: number) {
    let x = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + c_id, { headers: x });
  }

  updateCategory(c_id: number, item: category) {
    let body = JSON.stringify(item);
    let x = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(this.url + c_id, body, { headers: x });
  }
}
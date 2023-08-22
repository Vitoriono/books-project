import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthor, IFitness } from '../interfaces';


@Injectable({
  providedIn: 'root'
})
export class ApiService  {

 URL: string = 'api/fitness';

  constructor(private http: HttpClient) { }

  getElem(): Observable<Array<IAuthor>> {
    return this.http.get<Array<IAuthor>>(this.URL);
  }

   postElem(exercise: IAuthor): Observable<IAuthor> {
	console.log(exercise);
    return this.http.post<IAuthor>(this.URL, exercise);
  }
 
}
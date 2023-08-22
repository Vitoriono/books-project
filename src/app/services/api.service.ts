import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
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

   getPostById(id: number): Observable<IAuthor> {
    return this.http
      .get<IAuthor>(`${this.URL}/${id}`)
      .pipe(map((res: any) => res));
  }

  editElem(name: IFitness): Observable<IFitness>{
    return this.http.put<IFitness>(`${this.URL}/${name.id}`, name);
  }

  postElem(exercise: IAuthor): Observable<IAuthor> {
    return this.http.post<IAuthor>(this.URL, exercise);
  }

  deleteElem(id: number): Observable<IAuthor> {
    return this.http.delete<IAuthor>(`${this.URL}/${id}`);
  }
 
}
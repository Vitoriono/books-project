import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IAuthor, IBook, IFitness } from '../interfaces';


@Injectable({
  providedIn: 'root'
})
export class ApiService  {

 URL: string = 'api/fitness';

 booksURL: string = 'api/books';

  constructor(private http: HttpClient) { }

  getElem(): Observable<Array<IAuthor>> {
    return this.http.get<Array<IAuthor>>(this.URL);
  }

  getBooks(): Observable<Array<IBook>> {
    return this.http.get<Array<IBook>>(this.booksURL);
  }





   getPostById(id: number): Observable<IAuthor> {
    return this.http
      .get<IAuthor>(`${this.URL}/${id}`)
      .pipe(map((res: any) => res));
  }

  editElem(author: IAuthor): Observable<IFitness>{
    return this.http.put<IFitness>(`${this.URL}/${author.id}`, author);
  }





  postElem(exercise: IAuthor): Observable<IAuthor> {
    return this.http.post<IAuthor>(this.URL, exercise);
  }
  postBook(book: IBook): Observable<IBook> {
    return this.http.post<IBook>(this.booksURL, book);
  }

  



  deleteElem(id: number): Observable<IAuthor> {
    return this.http.delete<IAuthor>(`${this.URL}/${id}`);
  }
 
}
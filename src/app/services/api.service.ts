import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IAuthor, IBook, IGenre } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  URL: string = 'api/author';

  booksURL: string = 'api/books';

  genreURL: string = 'api/genres';

  constructor(private http: HttpClient) {}

  getAuthors(): Observable<Array<IAuthor | any>> {
    return this.http.get<Array<IAuthor | any>>(this.URL);
  }

  getBooks(): Observable<Array<IBook | any>> {
    return this.http.get<Array<IBook | any>>(this.booksURL);
  }

  getAuthById(id: number): Observable<IAuthor> {
    return this.http
      .get<IAuthor>(`${this.URL}/${id}`)
      .pipe(map((res: any) => res));
  }

  editAuthor(author: IAuthor): Observable<IAuthor> {
    console.log(author.id);
    return this.http.put<IAuthor>(`${this.URL}/${author.id}`, author);
  }

  editBook(book: IBook): Observable<IBook> {
    return this.http.put<IBook>(`${this.booksURL}/${book.id}`, book);
  }

  postAuthor(exercise: IAuthor): Observable<IAuthor> {
    return this.http.post<IAuthor>(this.URL, exercise);
  }

  postBook(book: IBook): Observable<IBook> {
    return this.http.post<IBook>(this.booksURL, book);
  }

  deleteAuthor(id: number): Observable<IAuthor> {
    return this.http.delete<IAuthor>(`${this.URL}/${id}`);
  }

  deleteBook(id: number): Observable<IBook> {
    return this.http.delete<IBook>(`${this.booksURL}/${id}`);
  }

  getGenres(): Observable<Array<IGenre>> {
    return this.http.get<Array<IGenre>>(this.genreURL);
  }

  postGenre(genre: IGenre): Observable<IGenre> {
    return this.http.post<IGenre>(this.genreURL, genre);
  }
}

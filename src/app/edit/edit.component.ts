import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IAuthor, IBook } from '../interfaces';
import { Observable, switchMap } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  declare authors$: Observable<IAuthor>;
  // declare login: string;
  declare editAuthor: IAuthor;
  declare editBook: IBook;
  declare booksList: Array<IBook>;
  declare userId: number | unknown;

  constructor(
    private apiServise: ApiService,
    private router: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit() {
    this.getAllDatas();
    // this.getUserId();
  }

  editAuthorForm!: FormGroup
  something: string = 'Hello';

  getAllDatas(){
     this.authors$ = this.router.params.pipe(
      switchMap((params: Params) => {
      this.apiServise.getBooks()
        .subscribe( data=> this.booksList = data
          .filter(value => value.foreignKey == params['id']));

        return this.apiServise.getAuthById(params['id']);
      })
    );
  }


  editsBook(title: string, genre: string, pages: string){
      console.log('Books', {title, genre, pages})
  }



  editsAuthor(lastName: string, name: string, father: string, dateBorn: string){
    this.authors$ = this.router.params.pipe(
      switchMap((params: Params) => {
        this.route.navigate(['/']);
        return this.apiServise.editElem({lastName, name, father, dateBorn, id: +params['id']});
      })
    )
  }


deleteBook(id: number) {
    this.apiServise.deleteBook(id).subscribe(data => {
      if (!data && data === false) {
        alert('Book not deleted!');
      } else {
        alert('Book deleted!');
        // this.route.navigate(['/']);
        this.getAllDatas()
      }
    });
  }
}

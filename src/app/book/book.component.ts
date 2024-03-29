import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ApiService } from '../services/api.service';
import { IBook, IGenre } from '../interfaces';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  declare bookForm: FormGroup;
  declare foreignKey: number | unknown;
  declare genres: Array<IGenre>;
  books: Array<IBook> = [];

  constructor(
    private apiServ: ApiService,
    private route: Router,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getForm();
    this.getForeignKey();
    this.getAllGenres();
  }

  getForm() {
    this.bookForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
      ]),
      pages: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      genre: new FormControl('Technology'),
    });
  }

  getAllGenres() {
    this.apiServ.getGenres().subscribe((data) => (this.genres = data));
  }

  onSubmit(bookForm: FormGroup) {
    const lastBook = bookForm.value;
    if (lastBook !== '') {
      this.apiServ
        .postBook({ ...lastBook, foreignKey: this.foreignKey })
        .subscribe((data) => {
          this.books.push(data);
        });
    }
    this.route.navigate(['/']);
    console.log(lastBook);
  }

  getForeignKey() {
    this.router.params
      .pipe(
        switchMap((params: Params) => {
          return params['id'];
        })
      )
      .subscribe((id) => (this.foreignKey = id));
  }
}

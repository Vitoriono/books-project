import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { IBook } from '../interfaces';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';

@Component({
  selector: 'app-find-book',
  templateUrl: './find-book.component.html',
  styleUrls: ['./find-book.component.scss'],
})
export class FindBookComponent implements OnInit {
  declare books: Array<IBook>;
  declare findForm: FormControl;
  declare invalid: string;
  loading: boolean = true;

  constructor(private apiServ: ApiService) {}

  ngOnInit() {
    this.getInputs();
    this.getAllBooks();
  }

  getInputs() {
    this.findForm = new FormControl();
    this.findForm.valueChanges
      .pipe(
        map((value) => {
          return value;
        }),
        debounceTime(700),
        distinctUntilChanged()
      )
      .subscribe((value) => {
        this.getFindBook(value);
      });
  }

  getFindBook(findBook: string) {
    this.apiServ.getBooks().subscribe((data) => {
      this.books = data.filter((value) => value.title.includes(findBook));
      if (this.books.length === 0) {
        this.invalid = 'Немає такої книги в списку';
      } else {
        this.invalid = '';
      }
    });
  }

  getAllBooks() {
    this.apiServ.getBooks().subscribe({
      next: (data) => {
        this.books = data.sort((a, b) => (a.title > b.title ? 1 : -1));
      },
      error: () => {
        console.error('Have you turned on the MemoryWebApi?!');
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}

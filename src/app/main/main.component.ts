import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { IAuthor, IBook } from '../interfaces';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  declare authorList: Array<IAuthor>;
  declare bookList: Array<IBook>;
  declare quantity: Object | any;
  loading: boolean = true;
  foreignKey!: number;

  constructor(private apiServ: ApiService) {}

  getAllAuthors() {
    this.apiServ.getBooks().subscribe({
      next: (quant) => {
        this.quantity = quant
          .map((x) => x.foreignKey)
          .reduce((acc, curr) => {
            acc[curr] = (acc[curr] || 0) + 1;
            return acc;
          }, {});
        this.apiServ.getAuthors().subscribe((values) => {
          this.authorList = values.map((author) => ({
            ...author,
            quantity: this.quantity[author.id],
          }));
        });
      },
      error: () => {
        console.error('Have you turned on the MemoryWebApi?!');
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  getAllBooks() {
    return this.apiServ.getBooks().subscribe((data) => (this.bookList = data));
  }

  detailAuthor(id: number) {
    console.log('Author id', id);
  }

  deleteAuthor(id: number) {
    this.apiServ.deleteElem(id).subscribe((data) => {
      if (!data && data === false) {
        alert('Автора не видалено!');
      } else {
        alert('Автора видалено!');
      }
      this.getAllAuthors();
    });
  }

  ngOnInit(): void {
    this.getAllAuthors();
    this.getAllBooks();
  }
}

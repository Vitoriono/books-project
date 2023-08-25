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
  declare quantity: Map<number, number> | any;
  loading: boolean = true;
  foreignKey!: number;

  constructor(private apiServ: ApiService) {}

  ngOnInit(): void {
    this.getAllAuthors();
  }

  getAllAuthors() {
    this.apiServ.getBooks().subscribe({
      next: (quant) => {
        this.quantity = quant
          .map((x) => x.foreignKey)
          .reduce((acc, curr) => {
            acc[curr] = (acc[curr] | 0) + 1;
            return acc;
          }, {});
        this.getQuantity();
      },
      error: () => {
        console.error('Have you turned on the MemoryWebApi?!');
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  getQuantity() {
    return this.apiServ.getAuthors().subscribe((values) => {
      this.authorList = values
        .map((author) => ({
          ...author,
          quantity: this.quantity[author.id] | 0,
        }))
        .sort((a, b) => (a.lastName > b.lastName ? 1 : -1));
    });
  }

  deleteAuthor(id: number) {
    this.apiServ.deleteAuthor(id).subscribe((data) => {
      if (!data && data === false) {
        alert('Автора не видалено!');
      } else {
        alert('Автора видалено!');
      }
      this.getAllAuthors();
    });
  }
}

import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { IBook } from '../interfaces';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';

@Component({
  selector: 'app-find-book',
  templateUrl: './find-book.component.html',
  styleUrls: ['./find-book.component.scss']
})
export class FindBookComponent {
  declare books: Array<IBook>
  declare findForm: FormControl;
  declare invalid: string;

  constructor(private apiServ: ApiService){}

  getInputs(){
    this.findForm = new FormControl();
    this.findForm.valueChanges.pipe(map(value => {
      return value}),
      debounceTime(800),
      distinctUntilChanged())
      .subscribe(value => {
        this.getFindBook(value);
      })
  }

  getFindBook(findBook: string){
    this.apiServ.getBooks().subscribe(data => {this.books = data
      .filter(value => value.title.includes(findBook))
      if(this.books.length === 0){
        this.invalid = 'Немає такої книги в списку';
      }else {
        this.invalid = '';
      }
  })
}

getAllBooks(){
  this.apiServ.getBooks().subscribe(data => this.books = data);
}

  ngOnInit(){
    this.getInputs();
    this.getAllBooks();
  }

}

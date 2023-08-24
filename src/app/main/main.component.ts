import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { IAuthor, IBook } from '../interfaces';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  constructor(private apiServ: ApiService){}

   declare authorList: Array<IAuthor>;
   declare bookList: Array<IBook>; 
   loading: boolean = true;
   foreignKey!: number;
   

  // delets: string = 'видалити';
  // edits: string = 'редагувати';
  

  getAllAuthors(){
    this.apiServ.getAuthors().subscribe({
      next: (data) => this.authorList = data,
      error: () => { console.error('Have you turned on the MemoryWebApi?!') },
      complete: () => {
        this.loading = false;
        console.log(this.authorList);
      }
    })
  }


getAllBooks(){
   return this.apiServ.getBooks().subscribe(data => this.bookList = data);
}



  detailAuthor(id: number){
    console.log('Author id',id)
  }




  deleteAuthor(id: number){
    this.apiServ.deleteElem(id).subscribe((data) => {
      if(!data && data === false){
        alert('Автора не видалено!');
      } else {
        alert('Автора видалено!');
      }
      this.getAllAuthors();
    })
  }

  ngOnInit(): void {
    this.getAllAuthors();
    this.getAllBooks();
  }

}

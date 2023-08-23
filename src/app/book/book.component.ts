import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ApiService } from '../services/api.service';
import { IBook } from '../interfaces';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent {

  constructor(
    private apiServ: ApiService,
    private route: Router,
    private router: ActivatedRoute,
    ){}

  declare bookForm: FormGroup;
  declare foreignKey: number | unknown;
  books: Array<IBook> = [];

  categories: Array<string> = ['Technology', 'Health', 'Opinion', 'Culture']

  getForm(){
    this.bookForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      pages: new FormControl("", Validators.required),
      genre: new FormControl("", Validators.required)
    })
  }

       

  onSubmit(bookForm: FormGroup){
    const lastBook = bookForm.value;

   


        if(lastBook !== ''){
      this.apiServ.postBook({...lastBook, foreignKey: this.foreignKey}).subscribe(data => {
        this.books.push(data);
      })
    }
    this.route.navigate(['/']);

    console.log('I am here', {...lastBook, foreignKey: this.foreignKey});

}


  getForeignKey(){
     this.router.params.pipe(
          switchMap((params: Params) => {
          return params['id']
          })
        ).subscribe(id => this.foreignKey = id);
  }
  


  ngOnInit(): void {
    this.getForm();
    this.getForeignKey();
          
    }
  }


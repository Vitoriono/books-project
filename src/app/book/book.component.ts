import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent {
  bookForm!: FormGroup;

  categories: Array<string> = ['Technology', 'Health', 'Opinion', 'Culture']

  getForm(){
    this.bookForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      quantity: new FormControl("", Validators.required),
      genre: new FormControl("", Validators.required)
    })
  }

  onSubmit(form: any){
    console.log(form);
  }

  ngOnInit(): void {
    this.getForm();
  }
}

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { IAuthor, IFitness } from '../interfaces';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent {
  constructor(private apiServ: ApiService) { }

  declare authorForm: FormGroup;
  declare author: Array<IAuthor>;

  getForm(){
    this.authorForm = new FormGroup({
      lastName: new FormControl(null, Validators.required ),
      name: new FormControl("", [Validators.required, Validators.minLength(4) ]),
      father: new FormControl(null, Validators.required ),
      dateBorn: new FormControl("", [Validators.required, Validators.minLength(4) ])
    })
  }

  ngOnInit(): void {
    this.getForm();
    this.getAuthor();
  }

  getAuthor(){
    this.apiServ.getElem().subscribe({
      next: (data) => this.author = data,
      error: () => { console.error('Have you turned on the MemoryWebApi?!') },
      complete: () => {
        this.author.reverse();
        console.log(this.author);
      }
    })
  }

  

   onSubmit(registrForm: FormGroup){
    const author = registrForm.value
    if(author !== ''){
      this.apiServ.postElem(author).subscribe((data: any) => {
        this.author.push(data);
      })
    }
  }
}

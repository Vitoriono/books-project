import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { IAuthor, IFitness } from '../interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent {
  constructor(private apiServ: ApiService, private router: Router) { }

  declare authorForm: FormGroup;
  declare author: Array<IAuthor>;

  getForm(){
    this.authorForm = new FormGroup({
      lastName: new FormControl("", [Validators.required, Validators.minLength(2) ]),
      name: new FormControl("", [Validators.required, Validators.minLength(4) ]),
      father: new FormControl("", [Validators.required, Validators.minLength(2)] ),
      dateBorn: new FormControl("", [Validators.required, Validators.minLength(4) ])
    })
  }

  ngOnInit(): void {
    this.getForm();
    this.getAuthor();
  }

  getAuthor(){
    this.apiServ.getAuthors().subscribe({
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
    this.router.navigate(['/']);
  }
}

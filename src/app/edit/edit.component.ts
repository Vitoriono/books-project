import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IAuthor, IBook } from '../interfaces';
import { Observable, switchMap } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  declare post$: Observable<IAuthor>;
  declare login: string;
  declare editAuthor: IAuthor;
  declare editBook: IBook;
  declare booksList: Array<IBook>;

  declare name: any;

  constructor(
    private apiServise: ApiService,
    private router: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit() {
    this.getAllDatas();
  }

  editAuthorForm!: FormGroup
  something: string = 'Hello';

  getAllDatas(){
     this.post$ = this.router.params.pipe(
      switchMap((params: Params) => {
      this.apiServise.getBooks()
        .subscribe( data=> this.booksList = data
          .filter(value => value.foreignKey == params['id']));

        return this.apiServise.getPostById(params['id']);
      })
    );
  }


  editBorn(lastName: string, name: string, father: string, dateBorn: string){
    
    const editAuthor = {
      lastName,
      name,
      father,
      dateBorn
    }

    this.post$ = this.router.params.pipe(
      switchMap((params: Params) => {
        this.route.navigate(['/']);
        return this.apiServise.editElem({...editAuthor, id: +params['id']});
        
      })
    )
    
  }

 

  






//  holdName(author: IAuthor, input: HTMLInputElement){
//     this.editAuthor = author;
//     input.value = author.name;
//   }

// editName(newName: string){
//     this.editAuthor.name = newName;
//     this.apiServise.editElem(this.editAuthor).subscribe(() => {
//     })
//   }


// holdLastName(author: IAuthor, input: HTMLInputElement){
//   this.editAuthor = author;
//   input.value = author.lastName;
// }


// editLastName(newName: string){
//   this.editAuthor.lastName = newName;
//   this.apiServise.editElem(this.editAuthor).subscribe(() => {
//   })

//   console.log('Hold Value', newName);
// }


  // holdPater(author: IAuthor, input: HTMLInputElement){
  //   this.editAuthor = author;
  //   input.value = author.father;
  // }


  // editPater(newName: string){
  //   this.editAuthor.father = newName;
  //   this.apiServise.editElem(this.editAuthor).subscribe(() => {
  //   })
  // }



  // holdBorn(author: IAuthor, input: HTMLInputElement){
  //   this.editAuthor = author;
  //   input.value = author.dateBorn;
  // }


 

  // holdBook(book: IBook, input: HTMLInputElement){
  //   this.editBook
  // }



  deleteBook(id: number) {
    this.apiServise.deleteBook(id).subscribe(data => {
      if (!data && data === false) {
        alert('Book not deleted!');
      } else {
        alert('Book deleted!');
        // this.route.navigate(['/']);
        this.getAllDatas()
      }
    });
  }
}

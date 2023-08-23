import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IAuthor, IBook } from '../interfaces';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  declare post$: Observable<IAuthor>;
  declare login: string;
  declare editingFit: IAuthor;
  declare booksList: Array<IBook>;

  constructor(
    private apiServise: ApiService,
    private router: ActivatedRoute,
    private rout: Router
  ) {}

  ngOnInit() {
  

    this.post$ = this.router.params.pipe(
      switchMap((params: Params) => {
        
        this.apiServise.getBooks()
        .subscribe( data=> this.booksList = data
          .filter(value => value.foreignKey == params['id']));

        return this.apiServise.getPostById(params['id']);
      })
    );
    
  }


  // getAllBooks(){
   
  // }



  beginEditFit(fit: IAuthor , input: HTMLInputElement){
    this.editingFit = fit
    input.value = fit.lastName;
  }


  completEditFit(newFit: string){
    this.editingFit.lastName = newFit;
    this.apiServise.editElem(this.editingFit).subscribe(() => {
    })
  }











  // deletePost(id: number) {
  //   this.apiServise.deletePost(id).subscribe((data) => {
  //     if (!data && data === false) {
  //       alert('Post not deleted!');
  //     } else {
  //       alert('Post deleted!');
  //       this.rout.navigate(['/']);
  //     }
  //   });
  // }
}

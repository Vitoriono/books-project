import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { IAuthor } from '../interfaces';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  constructor(private apiServ: ApiService){}

   authorList!: Array<IAuthor>;
   loading: boolean = true;
  //  editingFit!: any;

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

  detailAuthor(id: number){
    console.log('Author id',id)
  }




  deleteAuthor(id: number){
    this.apiServ.deleteElem(id).subscribe((data) => {
      if(!data && data === false){
        alert('Author not deleted!');
      } else {
        alert('Author deleted!');
      }
      this.getAllAuthors();
    })
  }

  ngOnInit(): void {
    this.getAllAuthors();
  }

}

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

   fitList!: Array<IAuthor>;
   editingFit!: any;

  delets: string = 'видалити';
  edits: string = 'редагувати';
  loading: boolean = true;

  getFitList(){
    this.apiServ.getElem().subscribe({
      next: (data) => this.fitList = data,
      error: () => { console.error('Have you turned on the MemoryWebApi?!') },
      complete: () => {
        this.loading = false;
        console.log(this.fitList);
      }
    })
  }

  getIdAuthor(id: number){
    console.log('Author id',id)
  }

  postFit(newFitExer: string){
    console.log('Not Value', newFitExer)
    // if(newFitExer !== ''){
    //   this.apiServ.postElem(newFitExer).subscribe(data => {
    //     this.fitList.unshift(data);
    //   })
    // }
  }

  beginEditFit(fit: any , input: HTMLInputElement){
    // this.editingFit = fit
    // input.value = fit.name;
  }

  completEditFit(newFit: string){
    // this.editingFit.name = newFit;
    // this.apiServ.editElem(this.editingFit).subscribe(() => {
    // })
  }

  deleteAuthor(id: number){
    this.apiServ.deleteElem(id).subscribe((data) => {
      if(!data && data === false){
        alert('Author not deleted!');
      } else {
        alert('Author deleted!');
      }
      this.getFitList();
    })
  }

  ngOnInit(): void {
    this.getFitList();
  }

}

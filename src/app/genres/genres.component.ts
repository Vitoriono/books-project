import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { IGenre } from '../interfaces';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent {

  constructor(private apiServ: ApiService){}

  declare genres: Array<IGenre>;

  // genre: Array<string> = ['Фантастика', 'Детектив', 'Поема', 'Роман'];

  ngOnInit(): void {
    this.getForm();
    this.getAllGenres();
  }


    declare genreForm: FormGroup;
  

  getForm(){
    this.genreForm = new FormGroup({
      genre: new FormControl("", [Validators.required, Validators.minLength(4)]),
    })
  }

  getGenre(genreForm: FormGroup){
    let lastGenre = genreForm.value;
      if(lastGenre !== ''){
      this.apiServ.postGenre(lastGenre).subscribe(data => {
        this.genres.push(data);
      })
    }
    this.genreForm.reset();
  }


   

  getAllGenres(){
    this.apiServ.getGenres().subscribe(data => this.genres = data);
  }

}

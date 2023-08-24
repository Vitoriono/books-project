import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent {

  genres: Array<string> = ['Фантастика', 'Детектив', 'Поема', 'Роман'];

  ngOnInit(): void {
    this.getForm();
  }


    declare genreForm: FormGroup;
  

  getForm(){
    this.genreForm = new FormGroup({
      genre: new FormControl("", [Validators.required, Validators.minLength(4)]),
    })
  }

  getGenre(genreForm: FormGroup){
    let lastGenre = genreForm.value;
        this.genres.push(lastGenre.genre);
      console.log(this.genres);
    this.genreForm.reset();
  }

}

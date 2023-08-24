import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class BackendService implements InMemoryDbService {

  constructor() { }

  createDb(): Object {
    let author  = [
      {id: 1, lastName: "Шевченко", name: "Тарас", father: "Григорович", dateBorn: "12.08.1815" },
      {id: 2, lastName: "Хайлайн", name: "Jdane", father: "Mafevrio", dateBorn: "12.18.1815" },
      {id: 3, lastName: "Dolly", name: "Jane", father: "Mario", dateBorn: "12.08.1815"},
      {id: 4, lastName: "Qurie", name: "Marie", father: "Hofman", dateBorn: "12.11.1815"},
     ];
     let books  = [
      {id: 1, title: "Двері у літо", pages: 350, genre: "Поема", foreignKey: 2 },
      {id: 2, title: "Фантастика", pages: 300, genre: "Поема", foreignKey: 2 },
      {id: 3, title: "Кобзар", pages: 250, genre: "Поема", foreignKey: 1 },
      {id: 4, title: "Щось там", pages: 250, genre: "Поема", foreignKey: 1 },
      {id: 5, title: "Якщо", pages: 250, genre: "Поема", foreignKey: 3 },
      {id: 6, title: "Парфумер", pages: 250, genre: "Поема", foreignKey: 4 },
     ];
    let genres = [
      {id: 1, genre: "Фантастика"},
      {id: 2, genre: "Детектив"},
      {id: 3, genre: "Поезія"},
      {id: 4, genre: "Трилер"},
    ]; 
    return { author, books, genres }
  }
}
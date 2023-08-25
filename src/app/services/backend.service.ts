import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class BackendService implements InMemoryDbService {

  constructor() { }

  createDb(): Object {
    let author  = [
      {id: 1, lastName: "Шевченко", name: "Тарас", father: "Григорович", dateBorn: "09.03.1814" },
      {id: 2, lastName: "Коцюбинський", name: "Михайло", father: "Михайлович", dateBorn: "25.04.1864" },
      {id: 3, lastName: "Кристі", name: "Агата", father: "", dateBorn: "15.09.1890"},
      {id: 4, lastName: "Кінг", name: "Стівен", father: "Едвін", dateBorn: "21.09.1927"},
     ];
     let books  = [
      {id: 1, title: "Тіні забутих предків", pages: 315, genre: "Роман", foreignKey: 2 },
      {id: 2, title: "Кобзар", pages: 420, genre: "Поезія", foreignKey: 1 },
      {id: 3, title: "Дорогою ціною", pages: 285, genre: "Драма", foreignKey: 2 },
      {id: 4, title: "Наймичка", pages: 250, genre: "Роман", foreignKey: 1 },
      {id: 5, title: "Зелена миля", pages: 420, genre: "Трилер", foreignKey: 4 },
      {id: 6, title: "Смерть на Нілі", pages: 318, genre: "Детектив", foreignKey: 3 },
     ];
    let genres = [
      {id: 1, genre: "Фантастика"},
      {id: 2, genre: "Детектив"},
      {id: 3, genre: "Поезія"},
      {id: 4, genre: "Трилер"},
      {id: 4, genre: "Роман"},
    ]; 
    return { author, books, genres }
  }
}
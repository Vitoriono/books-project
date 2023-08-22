import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class BackendService implements InMemoryDbService {

  constructor() { }

  createDb(): Object {
    let fitness  = [
      {id: 1, lastName: "Dolly", name: "Jane", father: "Mario", dateBorn: "12.08.1815" },
      // {id: 2, lastName: "Someone", name: "Jdane", father: "Mafevrio", dateBorn: "12.18.1815" },
      // {id: 3, lastName: "Dolly", name: "Jane", father: "Mario", dateBorn: "12.08.1815"},
      // {id: 4, lastName: "Qurie", name: "Marie", father: "Hofman", dateBorn: "12.11.1815"},
     ];
    return { fitness }
  }
}
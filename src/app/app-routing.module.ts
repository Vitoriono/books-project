import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorComponent } from './author/author.component';
import { BookComponent } from './book/book.component';
import { MainComponent } from './main/main.component';
import { EditComponent } from './edit/edit.component';
import { FindBookComponent } from './find-book/find-book.component';

const routes: Routes = [
  {path: '',  component: MainComponent},
  {path: 'findbook', component: FindBookComponent},
  {path: 'author',  component: AuthorComponent},
  {path: 'author/:id/book', component: BookComponent},
  { path: 'author/:id', component: EditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


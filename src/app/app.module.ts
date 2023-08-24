import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthorComponent } from './author/author.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookComponent } from './book/book.component';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { BackendService } from './services/backend.service';
import { MainComponent } from './main/main.component';
import { EditComponent } from './edit/edit.component';
import { FindBookComponent } from './find-book/find-book.component';
import { GenresComponent } from './genres/genres.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthorComponent,
    BookComponent,
    MainComponent,
    EditComponent,
    FindBookComponent,
    GenresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    InMemoryWebApiModule.forRoot(BackendService,
      { delay: 700 }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

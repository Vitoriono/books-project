import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthorComponent } from './author/author.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BookComponent } from './book/book.component';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { BackendService } from './services/backend.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthorComponent,
    BookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(BackendService,
      { delay: 700 }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

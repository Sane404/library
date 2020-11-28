import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AddAuthorComponent } from './add-author/add-author.component';
import { AuthorComponent } from './author/author.component';
import { LibraryComponent } from './library/library.component';
@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    AddAuthorComponent,
    AuthorComponent,
    LibraryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

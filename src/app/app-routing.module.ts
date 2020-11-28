import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAuthorComponent } from './add-author/add-author.component';
import { AuthorComponent } from './author/author.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LibraryComponent } from './library/library.component';

const routes: Routes = [
  { path: '', redirectTo: 'homepage', pathMatch: 'full'},
  { path: 'homepage',  component:HomepageComponent},
  { path: 'add_author', component: AddAuthorComponent},
  { path: 'author/:id', component: AuthorComponent},
  { path: 'library', component: LibraryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

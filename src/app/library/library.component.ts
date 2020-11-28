import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from '../shared/localstorage.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  constructor(private localstorage :LocalstorageService) { }
  all_books = [];
  ngOnInit(): void {
    let storage_data = this.localstorage.getData();
    storage_data.forEach((element,index) => {
      
      let books = element.books;
      books.forEach(book => {
        book.bookAuthorID = index + 1;
        
        
        book.bookAuthorName = element.AuthorName;
        this.all_books.push(book);
       
        
      });
    });
  }

}

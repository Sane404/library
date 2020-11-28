import { Component, OnInit} from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { LocalstorageService } from '../shared/localstorage.service';
import { FormGroup, FormControl,AbstractControl, NumberValueAccessor} from '@angular/forms';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  showForm:boolean = false;
  AddBookForm:boolean = false;
  editBookForm:boolean = false;
  currentAuthorData;
  storage;
  currentAuthorID;
  edit_authorForm;
  bookToEdit:number;
  currentBook;
  currentBookGenre;
  isAlive:boolean = false;
  add_Book = new FormGroup({
    booktitle: new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z\s]*$/)]),
    bookgenre: new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z\s]*$/)])
  })
  edit_Book = new FormGroup({
    booktitle: new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z\s]*$/)]),
    bookgenre: new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z\s]*$/)])
  })
  constructor(private route: ActivatedRoute,private router: Router,private localstorage :LocalstorageService) { }
  ngOnInit(): void {
    this.currentAuthorID = this.route.snapshot.params.id - 1;
    this.storage = this.localstorage.getData();
    this.currentAuthorData = this.storage[this.currentAuthorID];
    let DoBData = this.currentAuthorData.AuthorDoB.split(' ');
    let DoDData = this.currentAuthorData.AuthorDoD.split(' ');
    this.edit_authorForm = new FormGroup({
    fullName: new FormControl(this.currentAuthorData.AuthorName,[Validators.required,Validators.pattern(/^[a-zA-Z\s]*$/)]),
    day: new FormControl(DoBData[0],[Validators.required,Validators.min(1),Validators.max(31)]),
    month: new FormControl(DoBData[1],Validators.required),
    year: new FormControl(DoBData[2],[Validators.required,Validators.max(2020)]),
    alive : new FormControl(),
    day_D: new FormControl(DoDData[0],[Validators.min(1),Validators.max(31)]),
    month_D: new FormControl(DoDData[1]),
    year_D: new FormControl(DoDData[2],Validators.max(2020)),
    url: new FormControl(this.currentAuthorData.AuthorImg,ValidateUrl)
   }); 
  }
  get name(){return this.edit_authorForm.get('fullName');}
  get day(){return this.edit_authorForm.get('day');}
  get month(){return this.edit_authorForm.get('month');}
  get year(){return this.edit_authorForm.get('year');}
  get url(){return this.edit_authorForm.get('url');}
  get dayD(){return this.edit_authorForm.get('day_D');}
  get monthD(){return this.edit_authorForm.get('month_D');}
  get yearD(){return this.edit_authorForm.get('year_D');}
  get booktitle(){return this.edit_authorForm.get('bookgenre');}
  get bookgenre(){return this.edit_authorForm.get('bookgenre');}
  onSubmit(){
    if(this.edit_authorForm.status == "INVALID"){
      return;
    }
    else{
        this.replaceData();
    }
  }
  authorAlive(event){
    if(event.target.checked){
      this.isAlive = true;
    }else{
      this.isAlive = false;
    }
  }
  months = ["January" ,"February" ,"March","April","May","June","July","August","September","October","November","December"]
  removeBook(event){
    console.log(event.target);
    let bookname = event.target.parentNode.previousSibling.children[0].innerText;
    let indexOfBook = this.currentAuthorData.books.findIndex(i => i.book_title === bookname);
    let confirmation = confirm('Are you sure?');
    if(confirmation){
      this.localstorage.removeBookData(indexOfBook,this.currentAuthorID);
      window.location.reload();
    }
  }
  addBook(){
    if(this.add_Book.status == "INVALID"){
      return;
    }
    else{
        let index = this.currentAuthorID;
        let booktitle = this.add_Book.value.booktitle;
        let bookgenre = this.add_Book.value.bookgenre;
        let data = {
          book_title : booktitle,
          book_genre : bookgenre
        }
        this.localstorage.addBookData(index,data);
        this.AddBookForm = false;
        window.location.reload();        
    }
  }
  editBook(){
    if(this.edit_Book.status == "INVALID"){
      return;
    }
    else{
        let index = this.currentAuthorID;
        let booktitle = this.edit_Book.value.booktitle;
        let bookgenre = this.edit_Book.value.bookgenre;
        let data = {
          book_title : booktitle,
          book_genre : bookgenre
        }
        this.localstorage.editBookData(this.bookToEdit,index,data);
        this.editBookForm = false;
        window.location.reload();        
    }
  }
  removeAuthor(){
    let confirmation = confirm('Are you sure?');
    if(confirmation){
      this.localstorage.removeData(this.currentAuthorID);
      this.router.navigate(['']);
    }
  }
  replaceData(){
    let index = this.currentAuthorID;
    let url = this.edit_authorForm.value.url;
    let fullname = this.edit_authorForm.value.fullName;
    let day = this.edit_authorForm.value.day;
    let month = this.edit_authorForm.value.month;
    let year = this.edit_authorForm.value.year;
    let alive = this.edit_authorForm.value.alive;
    let day_D = this.edit_authorForm.value.day_D;
    let month_D = this.edit_authorForm.value.month_D;
    let year_D = this.edit_authorForm.value.year_D;
    let DoDData = `${day_D} ${month_D} ${year_D}`;
    if(alive){
      DoDData = 'Present Day';
    }
    let authorData = {
        AuthorDoB: `${day} ${month} ${year}`,
        AuthorDoD: DoDData,
        AuthorImg: url,
        AuthorName: fullname
    }
      this.localstorage.replaceData(authorData,index);
      window.location.reload();
}
  showEditForm(event){
    let background = <any>document.querySelector('.form_wrap');
    let button = <any>document.querySelector('.edit_Author');
    let closeForm = <any>document.querySelector('.form_close');
    this.currentBook;
    this.currentBookGenre;
    if(event.target == background || event.target == button || event.target == closeForm){
      if(this.showForm == false){
        this.showForm = true;
      }
      else{
        this.showForm = false;
      }
    }
  }
  showAddBookForm(event){
    let background = <any>document.querySelector('.addBook');
    let button = <any>document.querySelector('.add_Book');
    let closeForm = <any>document.querySelector('.add_book_close');
    if(event.target == background || event.target == button || event.target == closeForm){
      if(this.AddBookForm == false){
        this.AddBookForm = true;
      }
      else{
        this.AddBookForm = false;
      }
    }
  }
  showEditBookForm(event){
    let background = <any>document.querySelector('.editBook');
    let buttons = <any>document.querySelectorAll('.edit_Book');
    let closeForm = <any>document.querySelector('.edit_book_close');
    
    buttons.forEach(button => {
      if(event.target == button){
        if(this.editBookForm == false){
          this.editBookForm = true;
          let bookname = event.target.parentNode.previousSibling.children[0].innerText;
          this.bookToEdit = this.currentAuthorData.books.findIndex(i => i.book_title === bookname);
        }
        else{
          this.editBookForm = false;
        }
      }
    });
    if(event.target == background || event.target == closeForm){
      if(this.editBookForm == false){
        this.editBookForm = true;
      }
      else{
        this.editBookForm = false;
      }
    }
  }
}
function ValidateUrl(control: AbstractControl): {[key: string]: any} | null  {
  let httpCheck = control.value.split('/')[0];
  let type = control.value.split('.');
  let format = type[type.length - 1];
  if ((httpCheck == 'http:' || httpCheck == 'https:') && format == 'jpg') {
    return null;
  }
  return { 'urlInvalid': true };
  
}
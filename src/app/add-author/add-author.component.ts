import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { LocalstorageService } from '../shared/localstorage.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css']
})
export class AddAuthorComponent implements OnInit {
  isAlive:boolean = false;
  authorForm:FormGroup;
  ngOnInit(){
    this.authorForm = new FormGroup({
      fullName: new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z\s]*$/)]),
      day: new FormControl('',[Validators.required,Validators.min(1),Validators.max(31)]),
      month: new FormControl('',Validators.required),
      year: new FormControl('',[Validators.required,Validators.max(2020)]),
      alive : new FormControl(),
      day_D: new FormControl('',[Validators.required,Validators.min(1),Validators.max(31)]),
      month_D: new FormControl('',[Validators.required]),
      year_D: new FormControl('',[Validators.max(2020),Validators.required]),
      url: new FormControl('',ValidateUrl)
    });
    this.authorForm.get('alive').valueChanges.subscribe(value => {
      if(value) {
        this.authorForm.get('day_D').clearValidators();
        this.authorForm.get('month_D').clearValidators();
        this.authorForm.get('year_D').clearValidators();
        this.authorForm.controls['day_D'].updateValueAndValidity();
        this.authorForm.controls['month_D'].updateValueAndValidity();
        this.authorForm.controls['year_D'].updateValueAndValidity();
        console.log(this.authorForm);
        this.isAlive = true;
      } else {
        this.authorForm.get('day_D').setValidators([Validators.required,Validators.min(1),Validators.max(31)]);
        this.authorForm.get('month_D').setValidators([Validators.required]);
        this.authorForm.get('year_D').setValidators([Validators.max(2020),Validators.required]);
        this.authorForm.controls['day_D'].updateValueAndValidity();
        this.authorForm.controls['month_D'].updateValueAndValidity();
        this.authorForm.controls['year_D'].updateValueAndValidity();
        this.isAlive = false;
        console.log(this.authorForm);
      }
    }
);
  }
  constructor(private localstorage:LocalstorageService, private router:Router,private route :ActivatedRoute ) { }
  onSubmit(){
    let storage = this.localstorage.getData();
    const result = storage.find( ({ AuthorName }) => AuthorName === this.authorForm.value.fullName);
    if(result){
      alert('Name like this already in database');
      return
    }
    if(this.authorForm.status == "INVALID"){
      return;
    }
    else{

        this.addnewData();
    }
  }
  addnewData(){
      let url = this.authorForm.value.url;
      let fullname = this.authorForm.value.fullName;
      let day = this.authorForm.value.day;
      let month = this.authorForm.value.month;
      let year = this.authorForm.value.year;
      let alive = this.authorForm.value.alive;
      let day_D = this.authorForm.value.day_D;
      let month_D = this.authorForm.value.month_D;
      let year_D = this.authorForm.value.year_D;
      let DoDData = `${day_D} ${month_D} ${year_D}`;
      if(alive){
        DoDData = 'Present Day';
      }
      let authorData = {
          AuthorDoB: `${day} ${month} ${year}`,
          AuthorDoD: DoDData,
          AuthorImg: url,
          AuthorName: fullname,
          books: []
      }
        this.localstorage.pushToStorage(authorData);
        this.router.navigate(['']);
  }
  get name(){return this.authorForm.get('fullName');}
  get day(){return this.authorForm.get('day');}
  get month(){return this.authorForm.get('month');}
  get year(){return this.authorForm.get('year');}
  get url(){return this.authorForm.get('url');}
  get dayD(){return this.authorForm.get('day_D');}
  get monthD(){return this.authorForm.get('month_D');}
  get yearD(){return this.authorForm.get('year_D');}
  
  
  months = ["January" ,"February" ,"March","April","May","June","July","August","September","October","November","December"]
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

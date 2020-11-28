import { Component, OnInit } from '@angular/core';
import authors from '../../assets/DefaultAuthors.json';
import { LocalstorageService } from '../shared/localstorage.service';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private localstorage :LocalstorageService) { }
  authorsArray = authors;
  ngOnInit(): void {
    if(this.localstorage.getData()){
      this.authorsArray = this.localstorage.getData();
    }
    this.localstorage.setStorage(this.authorsArray);
    
  }
}

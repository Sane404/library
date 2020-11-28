import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }
  setStorage(data){
    localStorage.setItem("Authors",JSON.stringify(data));
  }
  pushToStorage(data){
    let storageData  = this.getData();
    storageData.push(data);
    this.setStorage(storageData);
  }
  replaceData(data,index){
    let storageData  = this.getData();
    storageData[index].AuthorName = data.AuthorName;
    storageData[index].AuthorDoB = data.AuthorDoB;
    storageData[index].AuthorDoD = data.AuthorDoD;
    storageData[index].AuthorImg = data.AuthorImg;
    console.log(storageData[index]);
    this.setStorage(storageData);
  }
  removeBookData(indexOFBook,authorIndex){
    let storageData  = this.getData();
    storageData[authorIndex].books.splice(indexOFBook,1);
    this.setStorage(storageData);
  }
  addBookData(index,data){
    let storageData  = this.getData();
    storageData[index].books.push(data);
    this.setStorage(storageData)
  }
  editBookData(indexOFBook,authorIndex,data){
    let storageData  = this.getData();
    storageData[authorIndex].books[indexOFBook] = data;
    this.setStorage(storageData);
  }
  removeData(index){
    let storageData  = this.getData();
    storageData.splice(index,1);
    this.setStorage(storageData);
  }
  getData(){
    return JSON.parse(localStorage.getItem('Authors'));
  }
}

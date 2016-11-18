import {
  Component,
  OnInit,
  Input, 
  Injectable
} from '@angular/core';
import { Article } from '../article/article.model';

import {Location} from '@angular/common'; 
//import {Http} from '@angular/http';
//import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app/subverse/subverse.component.html',
  styleUrls: ['./app/subverse/subverse.component.css'],
  host: {
    class: 'row'
  }
})
export class SubverseComponent implements OnInit {
    articles : Article[]; 
    subverseStr : string; 

constructor(private location:Location)
{
    this.articles = [
      new Article('Angular 2', 'http://angular.io', 'sub','', 3),
      new Article('Fullstack', 'http://fullstack.io', 'sub','', 2),
      new Article('Angular Homepage', 'http://angular.io', 'sub','', 1),
    ];

    this.subverseStr = location.path().split('/')[2]; 

    //based off of subverse load articles from the DB
}

  ngOnInit() {
      console.log("Subverse is: " + this.subverseStr); 
  }

  addArticle(title: HTMLInputElement, link: HTMLInputElement, text: HTMLInputElement): boolean {
    console.log(`Adding article title: ${title.value} and link: ${link.value}`);

    var a : Article = new Article(title.value, link.value,this.subverseStr,text.value, 0);

    this.articles.push(a);

    //add article a to db


    title.value = '';
    link.value = '';
    text.value = ''; 
    return false;
  }
  
    sortedArticles(): Article[] {
    return this.articles.sort((a: Article, b: Article) => b.votes - a.votes);
  }

}

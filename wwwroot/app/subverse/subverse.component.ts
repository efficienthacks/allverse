import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { Article } from '../article/article.model';

import {Location} from '@angular/common'; 

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
      new Article('Angular 2', 'http://angular.io', 'sub', 3),
      new Article('Fullstack', 'http://fullstack.io', 'sub', 2),
      new Article('Angular Homepage', 'http://angular.io', 'sub', 1),
    ];

    this.subverseStr = location.path().split('/')[2]; 

    //based off of subverse load articles from the DB
}

  ngOnInit() {
      //load articles based off of subverse 
      var RouteStr : string; 

      console.log("Subverse is: " + this.subverseStr); 
  }

  addArticle(title: HTMLInputElement, link: HTMLInputElement): boolean {
    console.log(`Adding article title: ${title.value} and link: ${link.value}`);
    this.articles.push(new Article(title.value, link.value,'home', 0));
    title.value = '';
    link.value = '';
    return false;
  }
  
    sortedArticles(): Article[] {
    return this.articles.sort((a: Article, b: Article) => b.votes - a.votes);
  }

}

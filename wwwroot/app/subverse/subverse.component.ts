import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { Article } from '../article/article.model';
import {router} from '@angular/router';

@Component({
  selector: 'app-subverse',
  templateUrl: './app/subverse/subverse.component.html',
  styleUrls: ['./app/subverse/subverse.component.css'],
  host: {
    class: 'row'
  }
})
export class SubverseComponent implements OnInit {
    articles : Article[]; 
    subverseStr : string; 

constructor(route: router)
{
    var RouteStr : string; 

    route.subscribe((url) => RouteStr = url); 

    var subverse = RouteStr.split("/")[1]; 

    this.articles = [
      new Article('Angular 2', 'http://angular.io', 'home', 3),
      new Article('Fullstack', 'http://fullstack.io', 'home', 2),
      new Article('Angular Homepage', 'http://angular.io', 'home', 1),
      new Article('Angular 2', 'http://angular.io', 'test', 3),
      new Article('Fullstack', 'http://fullstack.io', 'test', 2),
      new Article('Angular Homepage', 'http://angular.io', 'test', 1),
    ];

    //based off of subverse load articles from the DB
}

  ngOnInit() {
      //load articles based off of subverse 
      var RouteStr : string; 

      console.log("Subverse is: " + this.subverseStr); 
  }

    sortedArticles(): Article[] {
    return this.articles.sort((a: Article, b: Article) => b.votes - a.votes);
  }

}
import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { Article } from '../article/article.model';

@Component({
  selector: 'app-root',
  templateUrl: './app/home/home.component.html',
  styleUrls: ['./app/home/home.component.css'],
  host: {
    class: 'row'
  }
})
export class HomeComponent implements OnInit {
    articles : Article[]; 
    subverseStr : string; 

constructor()
{
    this.articles = [
      new Article('Angular 2', 'http://angular.io', 'home', 3),
      new Article('Fullstack', 'http://fullstack.io', 'home', 2),
      new Article('Angular Homepage', 'http://angular.io', 'home', 1),
    ];

    this.subverseStr = "home"; 

    //based off of subverse load articles from the DB
}

  ngOnInit() {
      //load articles based off of subverse 
      var RouteStr : string; 

      console.log("Homeverse");
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

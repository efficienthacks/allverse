import { Component } from '@angular/core';
import { Article } from './article/article.model';

@Component({
  selector: 'app-root',
  templateUrl: './app/app.component.html',
  styleUrls: ['./app/app.component.css']
})
export class AppComponent {
  articles: Article[];

  constructor() {
    this.articles = [
      new Article('Angular 2', 'http://angular.io', 'home', 3),
      new Article('Fullstack', 'http://fullstack.io', 'home', 2),
      new Article('Angular Homepage', 'http://angular.io', 'home', 1),
      new Article('Angular 2', 'http://angular.io', 'test', 3),
      new Article('Fullstack', 'http://fullstack.io', 'test', 2),
      new Article('Angular Homepage', 'http://angular.io', 'test', 1),
    ];
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
import { Component } from '@angular/core';
import { Article } from './article/article.model';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app/app.component.css']
})
export class AppComponent {
  articles: Article[];

  constructor() {

  }

  addArticle(title: HTMLInputElement, link: HTMLInputElement): boolean {
    console.log(`Not adding article`);
    return false;
  }

  sortedArticles(): Article[] {
    return this.articles.sort((a: Article, b: Article) => b.votes - a.votes);
  }
}

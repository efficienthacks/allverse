import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { Article } from '../models/article';

@Component({
  selector: 'app-article',
  templateUrl: './app/article/article.component.html',
  styleUrls: ['./app/article/article.component.css'],
  host: {
    class: 'row'
  }
})
export class ArticleComponent implements OnInit {
  @Input() article: Article;

  voteUp(): boolean {
    this.article.votes+=1;
    return false;
  }

  voteDown(): boolean {
    this.article.votes-=1;
    return false;
  }

  ngOnInit() {
  }

}

import {
  Component,
  OnInit,
  Input, 
  Injectable
} from '@angular/core';
import { Article } from '../article/article.model';

import {Location} from '@angular/common'; 
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AppServiceHackersPulse} from '../services/app.service.hackerspulse'; 

@Component({
  selector: 'app-root',
  templateUrl: './app/subverse/subverse.component.html',
  styleUrls: ['./app/subverse/subverse.component.css'],
  host: {
    class: 'row'
  },
  providers: [AppServiceHackersPulse]
})
export class SubverseComponent implements OnInit {
    articles : Article[]; 
    subverseStr : string; 
    service : AppServiceHackersPulse; 

constructor(private location:Location, private hpService: AppServiceHackersPulse)
{
    this.service = hpService; 

    this.subverseStr = location.path().split('/')[2]; 

    this.articles = this.service.GetArticles(this.subverseStr); 
}

  ngOnInit() {
      console.log("Subverse is: " + this.subverseStr); 
  }

  addArticle(title: HTMLInputElement, link: HTMLInputElement, text: HTMLInputElement): boolean {
    console.log(`Adding article title: ${title.value} and link: ${link.value}`);
    var userID : string = this.service.GetUserID(); 
    var a : Article = new Article(title.value, link.value,this.subverseStr,text.value,userID,0);
    this.service.AddArticle(a); 
    this.articles.push(a);
    
    title.value = '';
    link.value = '';
    text.value = ''; 
    return false;
  }
  
    sortedArticles(): Article[] {
    return this.articles.sort((a: Article, b: Article) => b.votes - a.votes);
  }

}

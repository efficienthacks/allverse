import {
  Component,
  OnInit,
  Input,
  AfterViewInit
} from '@angular/core';
import { Article } from '../models/article';
import {AppServiceHackersPulse} from '../services/app.service.hackerspulse';
import {User} from '../models/user'; 
import {Vote} from '../models/vote';

@Component({
  selector: 'app-article',
  templateUrl: './app/article/article.component.html',
  styleUrls: ['./app/article/article.component.css'],
  host: {
    class: 'row'
  },
  providers: [AppServiceHackersPulse]
})
export class ArticleComponent implements AfterViewInit {
  @Input() article: Article;
  service : AppServiceHackersPulse; 
  user : User; 
  isMod : boolean; 

  constructor(hpService : AppServiceHackersPulse)
  {
    this.service = hpService; 
    this.user = AppServiceHackersPulse.user; 
    this.isMod = AppServiceHackersPulse.isMod;  
  }

  voteUp(voteElement : HTMLElement): boolean {
    
    // vote not yet cast 
    if (voteElement.className.indexOf("circle") == -1)
    {
        var v : Vote = new Vote(); 
        v.articleid = this.article.id; 
        v.vote = 1; 
        v.userid = this.user.id; 

      this.service.PostVote(v).subscribe((voteResult) => {
        this.article.votes+=1;
        voteElement.className += " circle"; 
        console.log("Posted vote"); 
      }); 
    }
    else
    {
      this.service.DeleteVote(this.article.id, this.user.id).subscribe((voteResult) => {
        this.article.votes-=1;
        voteElement.className = "arrow up icon"; 
        console.log("removed vote"); 
      });
    }

    return false;
  }

  voteDown(voteElement : HTMLElement): boolean {
    // vote not yet cast 
    if (voteElement.className.indexOf("circle") == -1)
    {
      var v : Vote = new Vote(); 
      v.articleid = this.article.id; 
      v.vote = -1; 
      v.userid = this.user.id; 

      this.service.PostVote(v).subscribe((voteResult) => {
        this.article.votes-=1;
        voteElement.className += " circle"; 
      }); 
    }
    else
    {
      this.service.DeleteVote(this.article.id, this.user.id).subscribe((voteResult) => {
        this.article.votes+=1;
        voteElement.className = "arrow down icon"; 
      });
    }
    return false;
  }

  DeleteArticle()
  {
    this.service.DeleteArticle(this.article.id).subscribe((result)=>{

      var index = AppServiceHackersPulse.articles.indexOf(this.article); 
      if (index >= 0){
        AppServiceHackersPulse.articles.splice(index,1); 
        console.log("article splice"); 
      }

    });
  }

  ngAfterViewInit() {
    this.isMod = AppServiceHackersPulse.isMod; 
    console.log("Article ismod: " + this.isMod); 
  }

}

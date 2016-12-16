import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  ViewChild,
  ElementRef
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
  @ViewChild('upvote') upVote: ElementRef;
  @ViewChild('downvote') downVote: ElementRef;

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
        //if downvote highlighted... delete comment vote
        if (this.downVote.nativeElement.className.indexOf("circle") != -1)
        {
          this.article.votes+=1;
          this.downVote.nativeElement.className = "arrow down icon"; 
        }

        this.service.VoteArticle(this.article.id,this.user.id,1).subscribe((voteResult) => {
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
      //if upvote highlighted... delete comment vote
      if (this.upVote.nativeElement.className.indexOf("circle") != -1)
      {
        this.article.votes-=1;
        this.upVote.nativeElement.className = "arrow up icon"; 
      }

      this.service.VoteArticle(this.article.id,this.user.id,-1).subscribe((voteResult) => {
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

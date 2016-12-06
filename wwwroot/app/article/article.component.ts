import {
  Component,
  OnInit,
  Input
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
export class ArticleComponent implements OnInit {
  @Input() article: Article;
  service : AppServiceHackersPulse; 
  user : User; 

  constructor(hpService : AppServiceHackersPulse)
  {
    this.service = hpService; 
    this.user = AppServiceHackersPulse.user; 
  }

  voteUp(voteElement : HTMLElement): boolean {
    
    // vote not yet cast 
    if (voteElement.style.cssText.indexOf("circle") !== -1)
    {
        var v : Vote = new Vote(); 
        v.articleid = this.article.id; 
        v.vote = 1; 
        v.userid = this.user.id; 

      this.service.PostVote(v).subscribe(voteResult => {
        this.article.votes+=1;
        voteElement.style.cssText += "circle"; 
      }); 
    }
    else
    {
      this.service.DeleteVote(this.article.id, this.user.id).subscribe(vote => {
        this.article.votes-=1;
        vote.style.cssText = "arrow up icon"; 
      });
    }

    return false;
  }

  voteDown(voteElement : HTMLElement): boolean {
    // vote not yet cast 
    if (voteElement.style.cssText.indexOf("circle") !== -1)
    {
      var v : Vote = new Vote(); 
      v.articleid = this.article.id; 
      v.vote = -1; 
      v.userid = this.user.id; 

      this.service.PostVote(v).subscribe(voteResult => {
        this.article.votes-=1;
        voteElement.style.cssText += "circle"; 
      }); 
    }
    else
    {
      this.service.DeleteVote(this.article.id, this.user.id).subscribe(vote => {
        this.article.votes+=1;;
        vote.style.cssText = "arrow down icon"; 
      });
    }
    return false;
  }

  ngOnInit() {
  }

}

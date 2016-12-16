import {
  Component,
  OnInit,
  Input,
  AfterViewChecked,
  ViewChild,
  ElementRef
} from '@angular/core';
//angular imports 
import {Location} from '@angular/common'; 

//my js classes 
import { Article } from '../models/article';
import {AppServiceHackersPulse} from '../services/app.service.hackerspulse'; 
import {User} from '../models/user';
import {Comment} from '../models/comment';
import {Vote} from '../models/vote';
import {UserSub} from '../models/usersub';

@Component({
  selector: 'app-articlefullpage',
  templateUrl: './app/articlefullpage/articlefullpage.component.html',
  styleUrls: ['./app/articlefullpage/articlefullpage.component.css'],
  host: {
    class: 'row'
  },
  providers: [AppServiceHackersPulse]
})
export class ArticleFullPageComponent implements AfterViewChecked {
  @Input() article : Article; 
  @ViewChild('upvote') upVote: ElementRef;
  @ViewChild('downvote') downVote: ElementRef;
  service : AppServiceHackersPulse; 
  user : User; 
  Id : string; 
  mods : UserSub[]; 
  isRun : boolean; 
  isMod : boolean; 

  constructor(private location : Location, private hpService: AppServiceHackersPulse)
  {
    this.service = hpService; 
    this.Id = location.path().split('/')[2];
    this.isRun = false;  
  }

  ngAfterViewChecked() {

    if (this.isRun == false)
    {
      if (this.article != null)
      {
        this.isRun = true; 
        console.log("Article fullpage ngAfterViewChecked"); 
        console.log('article', this.article);
        console.log("islocked: " + this.article.islocked); 
        this.service.GetMods(this.article.subverse).subscribe((modsResult) =>
        {
          this.mods = modsResult; 

          this.service.GetUser().subscribe((user) => {

            this.user = user; 

            this.mods.forEach(function(elem){
              if (elem.userID == user.id)
              {
                AppServiceHackersPulse.isMod = true; 
                
                console.log("Is mod true"); 
              }
            });

            this.isMod = AppServiceHackersPulse.isMod; 
            
          });
        });
    }
    
  
    }
    
  }

  //mod wants to lock thread 
  LockThread()
  {
    this.article.islocked=1; 
    this.service.UpdateArticle(this.article).subscribe((result)=>{

    }); 
  }

  UnlockThread()
  {
    this.article.islocked=0; 
    this.service.UpdateArticle(this.article).subscribe((result)=>{
 
    }); 
  }

  //mod wants to lock thread 
  StickyThread()
  {
    this.article.isstickied=1; 
    this.service.UpdateArticle(this.article).subscribe((result)=>{

    }); 
  }

  UnstickyThread()
  {
    this.article.isstickied=0; 
    this.service.UpdateArticle(this.article).subscribe((result)=>{
 
    }); 
  }

  getArticle() : Article
  {
    return this.article; 
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
        console.log("removed comment downvote"); 
      }

      this.service.VoteArticle(this.article.id, this.user.id,1).subscribe((voteResult) => {
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
      //if downvote highlighted... delete comment vote
      if (this.upVote.nativeElement.className.indexOf("circle") != -1)
      {
        this.article.votes-=1;
        this.upVote.nativeElement.className = "arrow up icon"; 
        console.log("removed comment downvote"); 
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


  addComment(comment : HTMLInputElement)
  {
    var c : Comment = new Comment(0,this.user.id,this.user.name,comment.value,Number(this.Id),0);
    this.service.AddComment(c).subscribe((res) => {
      var r = res.json(); 
      c.id = r.id; 
      this.article.comments.push(c); 
      console.log("comment: " + c.content + " cid: " + c.id); 
    });
  }

}

import {
  Component,
  OnInit,
  Input,
  AfterViewChecked
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
  service : AppServiceHackersPulse; 
  user : User; 
  Id : string; 
  mods : UserSub[]; 
  isRun : boolean; 

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
        this.isRun = true; // ensures it will run only once 
        console.log("Article fullpage ngAfterViewChecked"); 
        console.log('article', this.article);
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
            
          });
        });
    }
    
  
    }
    
  }

  getArticle() : Article
  {
    return this.article; 
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

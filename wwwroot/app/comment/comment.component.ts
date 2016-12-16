import { Component, Input,Output,EventEmitter, OnInit, ViewChild, ElementRef } from '@angular/core';
import {AppServiceHackersPulse} from '../services/app.service.hackerspulse';
import {Location} from '@angular/common'; 

import {Comment} from '../models/comment'; 
import {User} from '../models/user';
import {Vote} from '../models/vote'; 

@Component({
  selector: 'app-comment',
  templateUrl: './app/comment/comment.component.html',
  styleUrls: ['./app/comment/comment.component.css'],
  providers: [AppServiceHackersPulse]
})
export class CommentComponent implements OnInit {
  @Input() comment : Comment;
  @ViewChild('upvote') upVote: ElementRef;
  @ViewChild('downvote') downVote: ElementRef;

  collapse: boolean;
  service : AppServiceHackersPulse; 
  user : User; 
  Id : string; 
  isMod : boolean; 

  constructor(private location : Location, hpService : AppServiceHackersPulse) {
    this.service = hpService; 
    this.Id = location.path().split('/')[2]; 
    this.user = AppServiceHackersPulse.user; 

    //sigh: find better way then to get user for every comment load? 
    console.log("User name: " + AppServiceHackersPulse.user.name); 
  }

  voteUp(voteElement : HTMLElement): boolean 
  {
    // vote not yet cast 
    if (voteElement.className.indexOf("circle") == -1)
    {
        //if downvote highlighted... delete comment vote
        if (this.downVote.nativeElement.className.indexOf("circle") != -1)
        {
          this.comment.votes+=1;
          this.downVote.nativeElement.className = "arrow down icon"; 
          console.log("removed comment downvote"); 
        }

        this.service.VoteComment(this.comment.id,this.user.id,1).subscribe((voteResult) => {
          this.comment.votes+=1;
          voteElement.className += " circle"; 
          console.log("Posted comment vote"); 
        }); 
    }
    else
    {
        this.service.DeleteCommentVote(this.comment.id, this.user.id).subscribe((voteResult) => {
          this.comment.votes-=1;
          voteElement.className = "arrow up icon"; 
          console.log("removed comment vote"); 
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
          this.comment.votes-=1;
          this.upVote.nativeElement.className = "arrow up icon"; 
          console.log("removed comment upvote"); 
      }

      this.service.VoteComment(this.comment.id,this.user.id,-1).subscribe((voteResult) => {
        this.comment.votes-=1;
        voteElement.className += " circle"; 
      }); 
    }
    else
    {
      this.service.DeleteCommentVote(this.comment.id, this.user.id).subscribe((voteResult) => {
        this.comment.votes+=1;
        voteElement.className = "arrow down icon"; 
      });
    }
    return false;
  }

  DeleteComment()
  {
    this.comment.content = "[Deleted]";
    this.comment.deleted = 1; 
    this.service.UpdateComment(this.comment).subscribe((result)=>{

    }); 
  }

  showReplyForm(form : HTMLFormElement)
  {
    console.log("reply form: " + form); 
    
    if (form.style.cssText.trim()=="")
    {
        form.style.cssText = "display:none"; 
    }
    else
    {
        form.style.cssText = ""; 
    }
  }

  addReply(form : HTMLFormElement, elem : HTMLInputElement)
  {
    form.style.cssText = "display: none";
    var c : Comment = new Comment(this.comment.level+1,this.user.id,this.user.name,elem.value,Number(this.Id),this.comment.id); 
    this.service.AddComment(c).subscribe((data) => {
      c.id = data.json().id; 
      this.comment.comments.push(c); 
    }); 

  }

  ngOnInit() {
    this.collapse = false;
    this.isMod = AppServiceHackersPulse.isMod; 
  }


}

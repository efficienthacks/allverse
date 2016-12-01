import { Component, Input,Output,EventEmitter, OnInit } from '@angular/core';
import {Comment} from '../models/comment'; 
import {AppServiceHackersPulse} from '../services/app.service.hackerspulse';
import {User} from '../models/user';
import {Location} from '@angular/common'; 
@Component({
  selector: 'app-comment',
  templateUrl: './app/comment/comment.component.html',
  styleUrls: ['./app/comment/comment.component.css'],
  providers: [AppServiceHackersPulse]
})
export class CommentComponent implements OnInit {
  @Input() comment : Comment;

  collapse: boolean;
  service : AppServiceHackersPulse; 
  user : User; 
  Id : string; 

  constructor(private location : Location, hpService : AppServiceHackersPulse) {
    this.service = hpService; 
    this.Id = location.path().split('/')[2]; 
    //sigh: find better way then to get user for every comment load? 
    this.service.GetUser().subscribe( (data) => {
      this.user = data; 
    }); 
    //console.log("Comment content: " + this.comment.content); 
  }

  showReplyForm(form : HTMLFormElement)
  {
    if (form.style.cssText.trim()=="")
    {
        form.style.cssText = "display:none"; 
    }
    else
    {
        form.style.cssText = ""; 
    }
    
    return false; 
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
  }
}

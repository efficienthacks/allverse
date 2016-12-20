import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
} from '@angular/core';

import {Location} from '@angular/common'; 
import {Observable} from 'rxjs/Observable';

import {Article} from '../models/article';
import {User} from '../models/user';
import {AppServiceHackersPulse} from '../services/app.service.hackerspulse'; 

@Component({
  selector: 'app-user',
  templateUrl: './app/user/user.component.html',
  styleUrls: ['./app/user/user.component.css'],
  host: {
    class: 'row'
  },
  providers: [AppServiceHackersPulse]
})

export class UserPageComponent implements OnInit {
  @ViewChild('loadmorecomments') btnLoadMore : ElementRef; 
  userStr : string; 
  service : AppServiceHackersPulse; 
  user : User; 
  comments : Comment[]; 
  numLoaded : number; 
  numCommentsPerPage : number; 

  constructor(private location : Location, private hpService: AppServiceHackersPulse)
  {
      this.numLoaded = 0; 
      this.service = hpService; 
      this.userStr  = location.path().split('/')[2];
      this.user = new User(); 
      this.user.name = this.userStr; 
      AppServiceHackersPulse.user = this.user; 

      this.service.GetCommentsPerUserPage().subscribe((result)=>{
        this.numCommentsPerPage = result; 

        this.service.GetUserPageComments(this.userStr,this.numLoaded,this.numCommentsPerPage).subscribe((comments)=>{
          this.comments = comments; 
        });
      });

  }

  LoadMoreComments()
  {
    this.numLoaded += 1; 

    var moreComments : Comment[]; 

    this.service.GetUserPageComments(this.userStr,this.numLoaded,this.numCommentsPerPage).subscribe((comments)=>{
      moreComments = comments; 

      //hide button if no more articles 
      if (moreComments.length == 0 || moreComments.length < this.numCommentsPerPage)
      {
        this.btnLoadMore.nativeElement.style.visibility = 'hidden';
        console.log("hide load more button"); 
      }

      for (var i = 0; i < moreComments.length; i++)
      {
        this.comments.push(moreComments[i]); 
      }
      
    });


  }

  ngOnInit() 
  {

  }
}

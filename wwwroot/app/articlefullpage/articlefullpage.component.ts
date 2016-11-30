import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { Article } from '../models/article';
import {Location} from '@angular/common'; 
import {AppServiceHackersPulse} from '../services/app.service.hackerspulse'; 
import {User} from '../models/user';
import {Comment} from '../models/comment';

@Component({
  selector: 'app-articlefullpage',
  templateUrl: './app/articlefullpage/articlefullpage.component.html',
  styleUrls: ['./app/articlefullpage/articlefullpage.component.css'],
  host: {
    class: 'row'
  },
  providers: [AppServiceHackersPulse]
})
export class ArticleFullPageComponent implements OnInit {
  @Input() article : Article; 
  service : AppServiceHackersPulse; 
  user : User; 
  Id : string; 

  constructor(private location : Location, private hpService: AppServiceHackersPulse)
  {
    this.service = hpService; 
    this.Id = location.path().split('/')[2]; 

    this.service.GetUser().subscribe( (data) => {
      this.user = data; 
    }); 
  }

  ngOnInit() {


  }

  getArticle() : Article
  {
    return this.article; 
  }

  addComment(comment : HTMLInputElement)
  {
    var c : Comment = new Comment(0,0,this.user.id,this.user.name,comment.value,Number(this.Id));
    this.article.comments.push(c); 
    console.log("comment: " + comment.value); 
  }

}

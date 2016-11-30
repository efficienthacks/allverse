import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { Article } from '../models/article';
import {Location} from '@angular/common'; 
import {AppServiceHackersPulse} from '../services/app.service.hackerspulse'; 


@Component({
  selector: 'app-articlepage',
  templateUrl: './app/articlepage/articlepage.component.html',
  styleUrls: ['./app/articlepage/articlepage.component.css'],
  host: {
    class: 'row'
  },
  providers: [AppServiceHackersPulse]
})
export class ArticlePageComponent implements OnInit {
  Id : string; 
  service : AppServiceHackersPulse; 
  article : Article; 

  constructor(location : Location,private hpService: AppServiceHackersPulse)
  {
    this.service = hpService; 
    this.Id = location.path().split('/')[2]; 
    console.log("Article: " + this.Id);
    this.service.GetArticle(this.Id).subscribe((data) =>{
      this.article = data; 
      console.log("Get Article Comments"); 
      this.service.GetComments(this.article.id).subscribe((data) => {
          this.article.comments = data; 
      }); 
      console.log(this.article.title); 
    });

    

  }

  getArticle() : Article[]
  {
    return [this.article]; 
  }

  ngOnInit() {


  }

}

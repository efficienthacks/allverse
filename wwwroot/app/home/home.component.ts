import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Article } from '../models/article';
import {User} from '../models/user';
import {AppServiceHackersPulse} from '../services/app.service.hackerspulse'; 
import {Observable} from 'rxjs/Observable';
@Component({
  selector: 'app-home',
  templateUrl: './app/home/home.component.html',
  styleUrls: ['./app/home/home.component.css'],
  host: {
    class: 'row'
  },
  providers: [AppServiceHackersPulse]
})
export class HomeComponent implements OnInit {
    @ViewChild('loadmorehomearticles') btnLoadMore : ElementRef; 
    articles : Article[]; 
    subverseStr : string; 
    service : AppServiceHackersPulse; 
    user : User; 
    numArticlesPerPage : number; 
    loadedMoreArticles : number;

    constructor(private hpService: AppServiceHackersPulse)
    {
        this.service = hpService; 
        this.subverseStr = "home"; 
        this.loadedMoreArticles=0; 
        
        //based off of subverse load articles from the DB
        this.service.GetArticlesPerPage().subscribe((result)=>{
          this.numArticlesPerPage = result; 
          console.log("articles per page is: " + result); 

          this.service.GetUser().subscribe( (data) => {
            this.user = data; 
            AppServiceHackersPulse.user = data; 

            if (this.user.id != null)
            {
              this.service.GetArticles(this.subverseStr, this.user.id, this.numArticlesPerPage, this.loadedMoreArticles).subscribe( (data)=>{
                this.articles = data;
                console.log("Loaded articles"); 
              });
            }
            else
            {
              //must be logged in to view articles! 
            }
          }); 
        });

        

    }

    
  LoadMoreArticles()
  {
    this.loadedMoreArticles += 1;

    var moreArticles : Article[]; 

    this.service.GetArticles(this.subverseStr, this.user.id, this.numArticlesPerPage, this.loadedMoreArticles).subscribe( (data)=>{
          
      moreArticles = data;

      //hide button if no more articles 
      if (moreArticles.length == 0 || moreArticles.length < this.numArticlesPerPage)
      {
        this.btnLoadMore.nativeElement.style.visibility = 'hidden';
        console.log("hide load more button"); 
      }

      // add more articles to articles 
      for (var i = 0; i < moreArticles.length; i++)
      {
        this.articles.push(moreArticles[i]); 
      }

    });
  }

  ngOnInit() 
  {
      //load articles based off of subverse 
      var RouteStr : string; 

      console.log("Subverse is: " + this.subverseStr);

  }

  sortedArticles(): Article[] {
    return this.articles; 
  }

}

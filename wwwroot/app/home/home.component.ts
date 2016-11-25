import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { Article } from '../article/article.model';
import {AppServiceHackersPulse} from '../services/app.service.hackerspulse'; 
import {Observable} from 'rxjs/Observable';
@Component({
  selector: 'app-root',
  templateUrl: './app/home/home.component.html',
  styleUrls: ['./app/home/home.component.css'],
  host: {
    class: 'row'
  },
  providers: [AppServiceHackersPulse]
})
export class HomeComponent implements OnInit {
    articles : Article[]; 
    subverseStr : string; 
    service : AppServiceHackersPulse; 

constructor(private hpService: AppServiceHackersPulse)
{
    this.service = hpService; 
    this.subverseStr = "home"; 
    
    //based off of subverse load articles from the DB
}

  ngOnInit() {
      //load articles based off of subverse 
      var RouteStr : string; 

      console.log("Subverse is: " + this.subverseStr);
    
      this.service.GetArticles(this.subverseStr).subscribe( (data)=>{
        console.log("CL: " + data.toString());
        this.articles = <Article[]>data; 
        console.log("Domain is: " + this.articles[0].domain()); 
      });

      
  }

  sortedArticles(): Article[] {
    return this.articles; 
    //return this.articles.sort((a: Article, b: Article) => b.votes - a.votes);
  }

}

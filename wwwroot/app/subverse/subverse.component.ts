import {
  Component,
  OnInit,
  Input, 
  Injectable
} from '@angular/core';
import { Article } from '../models/article';
import { User } from '../models/user'; 


import {Location} from '@angular/common'; 
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AppServiceHackersPulse} from '../services/app.service.hackerspulse'; 

@Component({
  selector: 'app-subverse',
  templateUrl: './app/subverse/subverse.component.html',
  styleUrls: ['./app/subverse/subverse.component.css'],
  host: {
    class: 'row'
  },
  providers: [AppServiceHackersPulse]
})
export class SubverseComponent implements OnInit {
    articles : Article[]; 
    subverseStr : string; 
    service : AppServiceHackersPulse; 
    user : User; 
    isFormVisible : boolean; 
    noMods : boolean; 
    mods : User[]; 

  constructor(private location:Location, private hpService: AppServiceHackersPulse)
  {
      this.service = hpService; 
      this.isFormVisible = false; 
      this.subverseStr = location.path().split('/')[2]; 
      this.service.GetMods(this.subverseStr).subscribe((mods) =>
      {
        if (mods.length > 0)
        {
          this.noMods = false; 
        }
        else
        {
          this.noMods = true; 
        }

        this.mods = mods; 
      });
  }

  ngOnInit() {
      console.log("Subverse is: " + this.subverseStr); 

      this.service.GetUser().subscribe( (data) => {
        this.user = data; 

        this.service.GetArticles(this.subverseStr, this.user.id).subscribe( (data)=>{
          this.articles = data; 
        });
      }); 

  }

  toggleForm() 
  {
    this.isFormVisible = !this.isFormVisible; 
  }

  addArticle(title: HTMLInputElement, link: HTMLInputElement, text: HTMLInputElement): boolean {
  
    var UID : string = this.user.id; 
    console.log(`Adding article title: ${title.value} and link: ${link.value} and uid ` + UID);
    
    var a : Article = new Article(title.value, link.value,this.subverseStr,text.value,this.user.id,0,0);
    
    console.log("Service add article"); 
    this.service.AddArticle(a).subscribe( (res) => {
      var r = res.json(); 
      a.id = r.id; 
      console.log("Article ID: " + a.id); 
      this.articles.push(a);
    }); 
    
    title.value = '';
    link.value = '';
    text.value = ''; 

    return false;
  }
  
  sortedArticles(): Article[] {
    return this.articles; 
    //return this.articles.sort((a: Article, b: Article) => b.votes - a.votes);
  }

}

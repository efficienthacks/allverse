import {
  Component,
  ViewChild,
  AfterViewInit,
  OnInit,
  Input, 
  Injectable,
  ElementRef
} from '@angular/core';
import { Article } from '../models/article';
import { User } from '../models/user'; 

import {Location} from '@angular/common'; 
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AppServiceHackersPulse} from '../services/app.service.hackerspulse'; 
import {UserSub} from '../models/usersub';

@Component({
  selector: 'app-subverse',
  templateUrl: './app/subverse/subverse.component.html',
  styleUrls: ['./app/subverse/subverse.component.css'],
  host: {
    class: 'row'
  },
  providers: [AppServiceHackersPulse]
})
export class SubverseComponent implements AfterViewInit {
    @ViewChild('btnSub') btnSub: ElementRef;
    articles : Article[]; 
    subverseStr : string; 
    service : AppServiceHackersPulse; 
    user : User; 
    isFormVisible : boolean;
    isModButtonVisible : boolean;  
    noMods : boolean; 
    mods : UserSub[]; 
    isSubscribed : number; 
    showModSettings : boolean; 
    isMod : boolean; 

  constructor(private location:Location, private hpService: AppServiceHackersPulse)
  {
      this.showModSettings = false; 
      this.isModButtonVisible = true; 
      this.service = hpService; 
      this.isFormVisible = false; 
      this.subverseStr = location.path().split('/')[2]; 
    
      this.service.GetMods(this.subverseStr).subscribe((modsResult) =>
      {
        this.mods = modsResult; 

        if (this.mods.length > 0)
        {
          this.isModButtonVisible = false; 
        }     

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

  toggleModSettings()
  {
    this.showModSettings = !this.showModSettings; 
    console.log(this.showModSettings); 
  }

  addModUser(input : HTMLInputElement)
  {
    console.log("Add user: " + input.value)
    
    this.service.AddMod(input.value, this.subverseStr).subscribe((result) => {

      if(result.id != 0)
      {
        this.mods.push(result); 
      }

      this.showModSettings = false; 

    }); 
    
    

  }

  toggleSubscribe(button : HTMLElement)
  {
    this.service.ToggleSubscribe(this.user.id,this.user.name,this.subverseStr).subscribe((result)=>{

      if (button.innerHTML.trim() == "Subscribe")
      {
        button.className="unsubscribe ui negative right floated button"; 
        button.innerHTML = "Unsubscribe";
      }
      else
      {
        button.className="subscribe ui positive right floated button"; 
        button.innerHTML = "Subscribe";
      }

    });

    console.log(button); 
  }

  becomeMod()
  {
    this.service.BecomeMod(this.user.id,this.user.name, this.subverseStr).subscribe((result)=>{
       this.isModButtonVisible = false; 
       console.log("Set mod visible: " + this.isModButtonVisible); 
       this.mods.push(result); 
    });

  }

  ngAfterViewInit() {
      console.log("Subverse is: " + this.subverseStr); 

     this.service.GetUser().subscribe( (data) => {
        this.user = data; 

        this.service.GetArticles(this.subverseStr, this.user.id).subscribe( (data)=>{
          this.articles = data;
          AppServiceHackersPulse.articles = data;  
        });

        this.service.IsUserSubscribed(this.user.id,this.subverseStr).subscribe((isSubbed) =>{

          if (isSubbed == 1)
          {
            //set button to look like saying "unsubscribe" 
            this.btnSub.nativeElement.className="unsubscribe ui negative right floated button"; 
            this.btnSub.nativeElement.innerHTML = "Unsubscribe";
          }

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
    return AppServiceHackersPulse.articles; 
    //return this.articles.sort((a: Article, b: Article) => b.votes - a.votes);
  }

}

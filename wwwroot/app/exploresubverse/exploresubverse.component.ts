import {
  Component,
  OnInit,
  Input,
  AfterViewChecked,
  ViewChild,
  ElementRef
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
  selector: 'app-exploresubverse',
  templateUrl: './app/exploresubverse/exploresubverse.component.html',
  styleUrls: ['./app/exploresubverse/exploresubverse.component.css'],
  host: {
    class: 'row'
  },
  providers: [AppServiceHackersPulse]
})

export class ExploreSubverseComponent implements OnInit {
  service : AppServiceHackersPulse; 
  subs : string[]; 

  constructor(private location : Location, private hpService: AppServiceHackersPulse)
  {
    this.service = hpService; 

    this.service.GetAllSubs().subscribe((result)=>{
      this.subs = result; 
    }); 
  }

  ngOnInit() {

  }

}

import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef
} from '@angular/core';
import {Location} from '@angular/common'; 
import {AppServiceHackersPulse} from '../services/app.service.hackerspulse'; 

import { Article } from '../models/article';
import {User} from '../models/user';

@Component({
  selector: 'app-bugorfeature',
  templateUrl: './app/bugorfeature/bugorfeature.component.html',
  styleUrls: ['./app/bugorfeature/bugorfeature.component.css'],
  host: {
    class: 'row'
  },
  providers: [AppServiceHackersPulse]
})
export class BugOrFeatureComponent implements OnInit {
  @ViewChild('bugorfeature') form : ElementRef; 
  @ViewChild('output') label : ElementRef; 

  Id : string; 
  service : AppServiceHackersPulse; 
  article : Article; 
  user: User; 

  constructor(location : Location,private hpService: AppServiceHackersPulse)
  {
    this.service = hpService; 
    this.Id = location.path().split('/')[2]; 
    console.log("Article: " + this.Id);

  }

  addBugOrFeature(bug : HTMLInputElement, feature : HTMLInputElement, newText : HTMLInputElement)
  {
    var isbug : boolean = bug.checked; 
    var isfeature : boolean = feature.checked;

    var isbugnum : number=0; 
    if (isbug)
    {
      isbugnum = 1; 
    }

    var isfeaturenum : number = 0; 
    if (isfeature)
    {
      isfeaturenum=1; 
    }

    var text : string = newText.value; 

    this.service.BugOrFeature(isbugnum,isfeaturenum,text).subscribe((result)=>{
      if (result != null)
      {
        //this.form.nativeElement.visibility = 'hidden'; 
        this.label.nativeElement.innerHTML = 'Success!';
      }
      else
      {
        this.label.nativeElement.innerHTML = 'Failed! Try again later';
      }
    });
  }

  ngOnInit() {


  }

}

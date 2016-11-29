import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { Article } from '../models/article';
import {Location} from '@angular/common'; 
import {AppServiceHackersPulse} from '../services/app.service.hackerspulse'; 
import {User} from '../models/user';

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

  constructor(private hpService: AppServiceHackersPulse)
  {
    this.service = hpService; 

    this.service.GetUser().subscribe( (data) => {
      this.user = data; 
    }); 
  }

  ngOnInit() {


  }

  addComment(comment : HTMLElement)
  {


  }

}

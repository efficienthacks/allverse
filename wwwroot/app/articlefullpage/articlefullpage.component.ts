import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { Article } from '../article/article.model';
import {Location} from '@angular/common'; 
import {AppServiceHackersPulse} from '../services/app.service.hackerspulse'; 

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

  constructor(private hpService: AppServiceHackersPulse)
  {
    this.service = hpService; 

  
  }

  ngOnInit() {


  }

}

import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { Article } from '../article/article.model';
import {Location} from '@angular/common'; 

@Component({
  selector: 'app-articlepage',
  templateUrl: './app/articlepage/articlepage.component.html',
  styleUrls: ['./app/articlepage/articlepage.component.css'],
  host: {
    class: 'row'
  }
})
export class ArticlePageComponent implements OnInit {
  
  Id : string; 
  article : Article; 


  constructor(location : Location)
  {
    this.Id = location.path().split('/')[2]; 
    console.log("Article: " + this.Id); 
  }

  ngOnInit() {


  }

}

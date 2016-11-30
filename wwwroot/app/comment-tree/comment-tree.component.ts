import { Component, Input, OnInit } from '@angular/core';
import {Comment} from '../models/comment';
@Component({
  selector: 'app-comment-tree',
  templateUrl: './app/comment-tree/comment-tree.component.html',
  styleUrls: ['./app/comment-tree/comment-tree.component.css']
})
export class CommentTreeComponent implements OnInit {
  @Input() commentTree : Comment[];

  constructor() {}

  ngOnInit() {
    console.log("CommentTree length: " + this.commentTree.length); 
  }

}

import {Comment} from './comment'; 

export class Article {
  id : number; 
  isanon : boolean; 
  title: string;
  link: string;
  text: string; 
  subverse : string;
  userID : string;  
  votes: number;
  comments : Comment[]; 

  constructor(title: string, link: string, subverse : string, text : string, userID : string, votes?: number) {
    this.title = title;
    this.link = link;
    this.text = text; 
    this.subverse = subverse; 
    this.userID = userID; 
    this.votes = votes || 0;
    this.comments = new Array<Comment>(); 
  }

  log() : void{
    console.log("Title: " + this.title + " Link: " + this.link + " subverse: " + this.subverse); 
  }

  domain(): string {
    try {
      return this.link; 
    } catch (err) {
      return null;
    }
  }

  voteUp(): void {
    this.votes += 1;
  }

  voteDown(): void {
    this.votes -= 1;
  }


}

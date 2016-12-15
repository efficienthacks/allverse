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
  islocked : number; 
  isstickied : number; 

  comments : Comment[];
  userVote : number;  
  time : number; 
  time_ago : string; 
  commentCount : number; 

  constructor(title: string, link: string, subverse : string, text : string, userID : string,userVote:number,votes: number) {
    this.title = title;
    this.link = link;
    this.text = text; 
    this.subverse = subverse; 
    this.userID = userID; 
    this.votes = votes || 0;
    this.userVote = userVote;
    this.comments = new Array<Comment>();
    this.islocked=0;
    this.isstickied=0; 
    this.time = Date.now(); 
    this.time_ago = this.timeSince(this.time); 
    this.commentCount=0; 
  }

  log() : void{
    console.log("Title: " + this.title + " Link: " + this.link + " subverse: " + this.subverse); 
  }

  domain(): string {

    var link = this.link; 

    if (link.indexOf("http") == -1)
    {
      link = "http://" + link; 
    }

    try {
      return link; 
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

//crs 11/29/16 - support function to get time since this comment
    timeSince(date : number) : string 
    {
        var seconds = Math.floor((Date.now() - date) / 1000);

        var interval = Math.floor(seconds / 31536000);

        if (interval > 1) {
            return interval + " years";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + " months";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + " days";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + " hours";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    }

}

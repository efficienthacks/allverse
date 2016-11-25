export class Article {
  id : number; 
  isanon : boolean; 
  title: string;
  link: string;
  text: string; 
  subverse : string;
  userID : string;  
  votes: number;

  constructor(title: string, link: string, subverse : string, text : string, userID : string, votes?: number) {
    this.title = title;
    this.link = link;
    this.text = text; 
    this.subverse = subverse; 
    this.userID = userID; 
    this.votes = votes || 0;
  }

  log() : void{
    console.log("Title: " + this.title + " Link: " + this.link + " subverse: " + this.subverse); 
  }

  voteUp(): void {
    this.votes += 1;
  }

  voteDown(): void {
    this.votes -= 1;
  }

  domain(): string {
    try {
      const link: string = this.link.split('//')[1];
      return link.split('/')[0];
    } catch (err) {
      return null;
    }
  }
}

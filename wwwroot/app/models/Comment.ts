
export class Comment
{
    // HN 
    id : number;
    level : number;
    userID : string;
    userName : string; 
    time : number; 
    time_ago: string;
    content: string; 
    comments : Comment[]; 
    deleted : boolean; 
    //ME
    articleID : number; 
    parentCommentID : number; 
    votes : number; 
    userVote : number; 

    constructor(level:number,userID:string,userName:string,content:string,articleID:number,parentCommentID:number)
    {
        this.id=-1; 
        this.level=level; 
        this.userID=userID; 
        this.userName = userName; 
        this.content = content; 
        this.articleID = articleID; 
        this.parentCommentID = parentCommentID; 
        
        this.time = Date.now(); 
        this.time_ago = this.timeSince(this.time); 
        this.deleted = false; 
        this.votes = 0;
        this.userVote = 0; 
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
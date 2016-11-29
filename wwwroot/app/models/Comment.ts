
export class Comment
{
    // HN 
    id : number;
    level : number;
    userID : string;
    userName : string; 
    time : Date; 
    time_ago: string;
    content: string; 
    comments : Comment[]; 
    deleted : boolean; 
    //ME
    articleID : number; 
}
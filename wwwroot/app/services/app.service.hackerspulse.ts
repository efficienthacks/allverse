import {Injectable} from '@angular/core';
import {Http, Response } from '@angular/http';
import {HttpHelpers} from '../utils/HttpHelpers';
import {Observable,} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import {User} from '../models/user';
import {Comment} from '../models/comment';
import {Vote} from '../models/vote';
import { Article } from '../models/article';
import {UserSub} from '../models/usersub';

@Injectable()
export class AppServiceHackersPulse extends HttpHelpers {
    private _getArticlePostUrl = 'Article/Post';
    private _getArticlesUrl = 'Article/GetArticles'; 
    private _getArticleUrl = 'Article/GetArticle'; 
    private _getArticleCommentsUrl = 'Article/GetComments';
    private _getUserUrl = 'Manage/GetUser';
    private _getCommentPostUrl = 'Article/PostComment'; 
    private _getVoteDeleteUrl = 'User/DeleteVote';
    private _getVotePostUrl = 'User/PostVote';
    private _getCommentVoteDeleteUrl = 'User/DeleteCommentVote';
    private _getModsUrl = 'User/GetMods'; 
    private _getBecomeModURL = 'User/BecomeMod'; 

    //vars
    public static user : User; 

    //private _todolist: Models.List[]; 
    private http : Http; 

    constructor(http: Http) {
        super(http);
        this.http = http; 
    }

    GetMods(subverse : string) : Observable<UserSub[]>
    {
        console.log(this._getModsUrl + "/?subverse="+subverse); 
        return this.http.get(this._getModsUrl + "/?subverse="+subverse)
                    .map(this.extractModsData)
                    .catch(this.handleError);
    }

    GetUser() : Observable<User>
    {
        console.log(this._getUserUrl); 
        return this.http.get(this._getUserUrl)
                    .map(this.extractUserData)
                    .catch(this.handleError);
    }

    GetArticle(id : string, userID) : Observable<Article>
    {
        return this.http.get(this._getArticleUrl + "/?id="+id+"&userID="+userID)
                    .map(this.extractArticleData)
                    .catch(this.handleError);        
    }

    GetArticles(subverse : string, userID : string) : Observable<Article[]>
    {
        console.log("GetArticles URL: " + this._getArticlesUrl + "/?subverse="+subverse + "&userID="+userID);

        return this.http.get(this._getArticlesUrl + "/?subverse="+subverse+ "&userID="+userID)
                    .map(this.extractArticlesData)
                    .catch(this.handleError);

    }

    
    GetComments(ArticleID : number, userID : string) : Observable<Comment[]>
    {
        console.log("GetArticles URL: " + this._getArticleCommentsUrl + "/?ArticleID="+ArticleID+ "&userID="+userID);

        return this.http.get(this._getArticleCommentsUrl + "/?ArticleID="+ArticleID + "&userID="+userID)
                    .map(this.extractData)
                    .catch(this.handleError);

    }

    DeleteVote(ArticleID : number, userID : string)
    {
        return this.http.get(this._getVoteDeleteUrl + "/?ArticleID="+ArticleID + "&userID="+userID)
                    .map(this.extractData)
                    .catch(this.handleError);
    }

    DeleteCommentVote(CommentID : number, userID : string)
    {
        return this.http.get(this._getCommentVoteDeleteUrl + "/?CommentID="+CommentID + "&userID="+userID)
                    .map(this.extractData)
                    .catch(this.handleError);
    }

    PostVote(v : Vote)
    {
        return this.postaction(v, this._getVotePostUrl);
    }



    private extractUserData(res: Response) 
    {
        var u : User = new User(); 
        let body = res.json();

        u.id = body.id; 
        u.isAuthenticated = body.isAuthenticated;
        u.name = body.name;
        AppServiceHackersPulse.user = u; 
        console.log("Extract user: " + u.name);
        return u;
    }

    private extractArticleData(res: Response) 
    {
        let b = res.json();
        var a : Article = new Article(b.title,b.link,b.subverse,b.text,b.userID,b.userVote,b.votes); 
        a.id = b.id; 
        return a;
    }

    private extractModData(res: Response)
    {
        let b = res.json();
        var u = new UserSub(); 
        
        u.id = b.id;
        u.ismod = b.ismod; 
        u.subverseName = b.subverseName; 
        u.userID = b.userID; 
        u.userName = b.userName; 

        return u;
    }


    private extractArticlesData(res: Response) 
    {
        let body = res.json();
        var articles : Article[] = new Array<Article>(); 

        for (var b in body)
        {
            var a : Article = new Article(body[b].title,body[b].link,body[b].subverse,body[b].text,body[b].userID,body[b].userVote,body[b].votes);
            a.id = body[b].id; 
            articles.push(a);  
        }

        return articles;
    }

    private extractModsData(res: Response) 
    {
        let body = res.json();
        var mods : UserSub[] = new Array<UserSub>(); 

        for (var b in body)
        {
            var u : UserSub = new UserSub();//(body[b].title,body[b].link,body[b].subverse,body[b].text,body[b].userID,body[b].userVote,body[b].votes);
            u.id = body[b].id; 
            u.ismod = body[b].ismod; 
            u.subverseName = body[b].subversename; 
            u.userID = body[b].userID ;
            u.userName = body[b].userName; 

            mods.push(u);  
        }

        return mods;
    }

    private extractCommentsData(res: Response) 
    {
        let body = res.json();
        var comments : Comment[] = new Array<Comment>(); 
        console.log("Extract comments data"); 
        for (var b in body)
        {
            var c : Comment = new Comment(body[b].level,body[b].userID,body[b].userName,body[b].content,body[b].articleID,body[b].parentCommentID,);            var c : Comment = new Comment(body[b].level,body[b].userID,body[b].userName,body[b].content,body[b].articleID,body[b].parentCommentID);
            c.id = body[b].id; 
            comments.push(c); 
            console.log("pushed cid: " + c.id);  
        }

        return comments;
    }
    private extractData(res: Response) 
    {
        let body = res.json();
        return body;
    }
    private handleError (error: Response | any) 
    {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
        errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    AddArticle(article: Article) : Observable<Response> {
        return this.postaction(article, this._getArticlePostUrl);
    }

    AddComment(comment : Comment) : Observable<Response> {
        return this.postaction(comment, this._getCommentPostUrl); 
    }

    BecomeMod(uid : string,userName : string, subverse : string){
        return this.http.get(this._getBecomeModURL + "/?UserID="+uid + "&UserName=" + userName + "&subverse="+subverse)
            .map(this.extractModData)
            .catch(this.handleError);
    }
}
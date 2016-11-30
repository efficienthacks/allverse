import {Injectable} from '@angular/core';
import {Http, Response } from '@angular/http';
import {HttpHelpers} from '../utils/HttpHelpers';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user';
import {Comment} from '../models/comment';
import 'rxjs/Rx';

import { Article } from '../models/article';

@Injectable()
export class AppServiceHackersPulse extends HttpHelpers {

    private _getArticlePostUrl = 'Article/Post';
    private _getArticlesUrl = 'Article/GetArticles'; 
    private _getArticleUrl = 'Article/GetArticle'; 
    private _getArticleCommentsUrl = 'Article/GetComments';
    private _getUserUrl = 'Manage/GetUser';
    private _getCommentPostUrl = 'Article/PostComment'; 

    //private _todolist: Models.List[]; 
    private http : Http; 

    constructor(http: Http) {
        super(http);
        this.http = http; 
    }

    GetUser() : Observable<User>
    {
        console.log(this._getUserUrl); 
        return this.http.get(this._getUserUrl)
                    .map(this.extractUserData)
                    .catch(this.handleError);
    }

    GetArticle(id : string) : Observable<Article>
    {
        return this.http.get(this._getArticleUrl + "/"+id)
                    .map(this.extractArticleData)
                    .catch(this.handleError);        
    }

    GetArticles(subverse : string) : Observable<Article[]>
    {
        console.log("GetArticles URL: " + this._getArticlesUrl + "/?subverse="+subverse);

        return this.http.get(this._getArticlesUrl + "/?subverse="+subverse)
                    .map(this.extractArticlesData)
                    .catch(this.handleError);

    }

    
    GetComments(ArticleID : number) : Observable<Comment[]>
    {
        console.log("GetArticles URL: " + this._getArticleCommentsUrl + "/?ArticleID="+ArticleID);

        return this.http.get(this._getArticleCommentsUrl + "/?ArticleID="+ArticleID)
                    .map(this.extractCommentsData)
                    .catch(this.handleError);

    }

    private extractUserData(res: Response) 
    {
        var u : User = new User(); 
        let body = res.json();

        u.id = body.id; 
        u.isAuthenticated = body.isAuthenticated;
        u.name = body.name;

        return u;
    }

    private extractArticleData(res: Response) 
    {
        let b = res.json();
        var a : Article = new Article(b.title,b.link,b.subverse,b.text,b.userID,b.votes); 
        a.id = b.id; 
        return a;
    }
    private extractArticlesData(res: Response) 
    {
        let body = res.json();
        var articles : Article[] = new Array<Article>(); 

        for (var b in body)
        {
            var a : Article = new Article(body[b].title,body[b].link,body[b].subverse,body[b].text,body[b].userID,body[b].votes);
            a.id = body[b].id; 
            articles.push(a);  
        }

        return articles;
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
}
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
import {BugOrFeature} from '../models/BugOrFeature';

@Injectable()
export class AppServiceHackersPulse extends HttpHelpers {
    private _getArticlePostUrl = 'Article/Post';
    private _getArticlesUrl = 'Article/GetArticles'; 
    private _getArticleUrl = 'Article/GetArticle'; 
    private _getArticleCommentsUrl = 'Article/GetComments';
    private _getUserUrl = 'User/GetUser';
    private _getCommentPostUrl = 'Article/PostComment'; 
    private _getVoteArticleUrl = 'User/VoteArticle';
    private _getVoteCommentUrl = 'User/VoteComment';
    private _getDeleteCommentVoteURL = 'User/DeleteCommentVote';
    private _getDelteArticleVoteURL = 'User/DeleteVote'; 
    private _getModsUrl = 'User/GetMods'; 
    private _getBecomeModURL = 'User/BecomeMod'; 
    private _toggleSubscribeURL = 'User/ToggleSubscribe';
    private _getIsUserSubscribed = 'User/IsSubscribed';
    private _getAddModURL = 'User/AddMod';
    private _getDeleteArticleURL = 'Article/DeleteArticle';  
    private _getUpdateCommentPostUrl = 'Article/UpdateComment'; 
    private _getUpdateArticlePostURL = 'Article/Update'; 
    private _getNumberOfArticlesPerPageUrl = 'Article/NumberOfArticlesPerPage'; 
    private _getNumberOfCommentsPerArticleUrl = 'Article/NumberOfCommentsPerArticle'; 
    private _getSubscriberCountUrl = 'User/GetSubscriberCount'; 
    private _getAllSubsUrl = 'Subverse/GetAllSubs';
    private _getBugOrFeatureUrl = 'User/BugOrFeature'; 

    //vars
    public static user : User; 
    // is current user a mod? 
    public static isMod : boolean; 
    // articles
    public static articles : Article[]; 

    //private _todolist: Models.List[]; 
    private http : Http; 

    constructor(http: Http) {
        super(http);
        this.http = http; 
    }

    DeleteArticle(articleid : number)
    {
        console.log(this._getDeleteArticleURL + "/?articleID=" + articleid); 
        return this.http.get(this._getDeleteArticleURL + "/?articleID=" + articleid)
                    .map(this.extractData)
                    .catch(this.handleError);  
    }

    AddMod(userName : string, subverse : string)
    {
        console.log(this._getAddModURL + "/?userName=" + userName + "&subverse=" + subverse); 
        return this.http.get(this._getAddModURL + "/?userName=" + userName+ "&subverse=" + subverse)
                    .map(this.extractUserSubData)
                    .catch(this.handleError);        
    }

    IsUserSubscribed(uid: string, subverse: string)
    {
        console.log(this._getIsUserSubscribed + "/?UserID=" + uid + "&subverse="+subverse); 
        return this.http.get(this._getIsUserSubscribed + "/?UserID=" + uid + "&subverse="+subverse)
                    .map(this.extractData)
                    .catch(this.handleError);
    }

    GetAllSubs()
    {
        console.log(this._getAllSubsUrl); 
        return this.http.get(this._getAllSubsUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
    }

    GetMods(subverse : string) : Observable<UserSub[]>
    {
        console.log(this._getModsUrl + "/?subverse="+subverse); 
        return this.http.get(this._getModsUrl + "/?subverse="+subverse)
                    .map(this.extractUserSubsData)
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

    GetArticles(subverse : string, userID : string, numArtsPerPage : number, numLoaded : number) : Observable<Article[]>
    {
        console.log("GetArticles URL: " + this._getArticlesUrl + "/?subverse="+subverse + "&userID="+userID + "&numArticlesPerPage="+numArtsPerPage+"&numLoaded="+numLoaded);

        return this.http.get(this._getArticlesUrl + "/?subverse="+subverse+ "&userID="+userID+ "&numArticlesPerPage="+numArtsPerPage+"&numLoaded="+numLoaded)
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

    VoteArticle(ArticleID : number, userID : string, vote : number)
    {
        return this.http.get(this._getVoteArticleUrl + "/?ArticleID="+ArticleID + "&userID="+userID+"&vote="+vote)
                    .map(this.extractVoteData)
                    .catch(this.handleError);
    }

    VoteComment(CommentID : number, userID : string, vote : number)
    {
        return this.http.get(this._getVoteCommentUrl + "/?CommentID="+CommentID + "&userID="+userID+"&vote="+vote)
                    .map(this.extractVoteData)
                    .catch(this.handleError);
    }

    DeleteVote(ArticleID : number, userID : string)
    {
        return this.http.get(this._getDeleteArticleURL + "/?ArticleID="+ArticleID + "&userID="+userID)
                    .map(this.extractData)
                    .catch(this.handleError);
    }

    DeleteCommentVote(CommentID : number, userID : string)
    {
        return this.http.get(this._getDeleteArticleURL + "/?CommentID="+CommentID + "&userID="+userID)
                    .map(this.extractData)
                    .catch(this.handleError);
    }

    GetSubscriberCount(subverse : string)
    {
        return this.http.get(this._getSubscriberCountUrl + "/?subverse="+subverse)
                    .map(this.extractData)
                    .catch(this.handleError);
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
        a.islocked=b.islocked;
        a.isstickied=b.isstickied; 
        a.time_ago = b.time_ago; 
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

    private extractVoteData(res : Response)
    {
        let b = res.json();
        var v = new Vote(); 
        
        v.id = b.id;
        v.articleid = b.articleid; 
        v.commentid = b.commentid; 
        v.userid = b.userid; 
        v.vote = b.vote; 

        return v;        
    }


    private extractArticlesData(res: Response) 
    {
        let body = res.json();
        var articles : Article[] = new Array<Article>(); 

        for (var b in body)
        {
            var a : Article = new Article(body[b].title,body[b].link,body[b].subverse,body[b].text,body[b].userID,body[b].userVote,body[b].votes);
            a.id = body[b].id; 
            a.islocked=body[b].islocked;
            a.isstickied=body[b].isstickied; 
            a.time_ago = body[b].time_ago; 
            a.commentCount = body[b].commentCount;
            articles.push(a);  
        }

        return articles;
    }

    private extractUserSubsData(res: Response) 
    {
        let body = res.json();
        var mods : UserSub[] = new Array<UserSub>(); 

        for (var b in body)
        {
            var u : UserSub = new UserSub();
            u.id = body[b].id; 
            u.ismod = body[b].ismod; 
            u.subverseName = body[b].subversename; 
            u.userID = body[b].userID ;
            u.userName = body[b].userName; 
            u.isSubscribed = body[b].isSubscribed;

            mods.push(u);  
        }

        return mods;
    }

    private extractUserSubData(res: Response) 
    {
        let body = res.json();

        var u : UserSub = new UserSub();
        u.id = body.id; 
        u.ismod = body.ismod; 
        u.subverseName = body.subversename; 
        u.userID = body.userID ;
        u.userName = body.userName; 
        u.isSubscribed = body.isSubscribed;

        return u;
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

    BugOrFeature(isbug : number,isfeature : number,text : string)
    {   
        var bugorfeature : BugOrFeature = new BugOrFeature(isbug,isfeature,text);
        return this.postaction(bugorfeature, this._getBugOrFeatureUrl);  
    }

    AddArticle(article: Article) : Observable<Response> {
        return this.postaction(article, this._getArticlePostUrl);
    }

    AddComment(comment : Comment) : Observable<Response> {
        return this.postaction(comment, this._getCommentPostUrl); 
    }

    UpdateComment(comment : Comment) : Observable<Response> {
        return this.postaction(comment, this._getUpdateCommentPostUrl); 
    }

    UpdateArticle(article : Article) : Observable<Response>{
        return this.postaction(article, this._getUpdateArticlePostURL); 
    }

    BecomeMod(uid : string,userName : string, subverse : string){
        return this.http.get(this._getBecomeModURL + "/?UserID="+uid + "&UserName=" + userName + "&subverse="+subverse)
            .map(this.extractUserSubData)
            .catch(this.handleError);
    }

    ToggleSubscribe(uid : string,userName:string, subverse : string)
    {
         return this.http.get(this._toggleSubscribeURL + "/?UserID="+uid + "&UserName=" + userName + "&subverse="+subverse)
            .map(this.extractUserSubData)
            .catch(this.handleError);
    }


    GetArticlesPerPage()
    {
         return this.http.get(this._getNumberOfArticlesPerPageUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    GetCommentsPerArticle()
    {
         return this.http.get(this._getNumberOfCommentsPerArticleUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

}
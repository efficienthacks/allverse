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
    private _getUserUrl = 'Manage/GetUser';


    //private _todolist: Models.List[]; 
    private http : Http; 

    constructor(http: Http) {
        super(http);
        this.http = http; 
        /*this.getaction<Models.List[]>(this._getTodoListUrl).subscribe(
            result => {
                this._todolist = result;

                if (this._todolist.length > 0) {
                    this.SelectedList = this._todolist[0];
                }
            },
            error => this.errormsg = error);*/
    }

    /*get todolist(): Models.List[] {
        if (this._todolist) {
            this._todolist.map(m => {
                if (m.Tasks) {
                    m.Count = m.Tasks.length;
                    m.CountEnded = m.Tasks.filter(f => f.Ended).length;
                }
            });
        }

        return this._todolist;
    }

    SelectedList: Models.List;*/

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
        return a;
    }
    private extractArticlesData(res: Response) 
    {
        let body = res.json();
        var articles : Article[] = new Array<Article>(); 

        for (var b in body)
        {
            var a : Article = new Article(body[b].title,body[b].link,body[b].subverse,body[b].text,body[b].userID,body[b].votes);
            articles.push(a);  
        }

        return articles;
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

    AddArticle(article: Article) : Article {
        console.log("AddArticle: title " + article.title); 
        var a : Article; 
        this.postaction(article, this._getArticlePostUrl).subscribe(
            result => {
                
                    a = article; 
                
            }, error => { this.errormsg = error; console.log(this.errormsg);});

            return a; 
    }
/**\
         this.getaction<Models.List[]>(this._getTodoListUrl).subscribe(
            result => {
                this._todolist = result;

                if (this._todolist.length > 0) {
                    this.SelectedList = this._todolist[0];
                }
            },
            error => this.errormsg = error);
 */
/*
    UpdateList(list: Models.List) {
        this.postaction(list, this._getListUpdateUrl).subscribe(result => result, error => this.errormsg = error);
    }

    DeleteList(list: Models.List) {
        this.postaction(list, this._getListDeleteUrl).subscribe(result => {

            if (!result.haserror) {
                var index = this._todolist.indexOf(list, 0);

                if (index > -1) {
                    this._todolist.splice(index, 1);
                }
            }
        }, error => this.errormsg = error);
    }

    AddTask(task: Models.Task) {
        this.postaction(task, this._getTaskAddUrl).subscribe(result => {
            if (!result.haserror) {
                this.SelectedList.Tasks.push(result.element);
            }
        }, error => this.errormsg = error);
    }

    UpdateTask(task: Models.Task) {
        this.postaction(task, this._getTaskUpdateUrl).subscribe(result => result, error => this.errormsg = error);
    }

    DeleteTask(task: Models.Task) {
        this.postaction(task, this._getTaskDeleteUrl).subscribe(result => {

            if (!result.haserror) {
                var index = this.SelectedList.Tasks.indexOf(task, 0);

                if (index > -1) {
                    this.SelectedList.Tasks.splice(index, 1);
                }
            }
        }, error => this.errormsg = error);
    }*/
}
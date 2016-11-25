import {Injectable} from '@angular/core';
import {Http, Response } from '@angular/http';
import {HttpHelpers} from '../utils/HttpHelpers';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user';
import 'rxjs/Rx';

import {Article} from '../article/article.model'; 

@Injectable()
export class AppServiceHackersPulse extends HttpHelpers {

    private _getArticlePostUrl = 'Article/Post';
    private _getArticlesUrl = 'Article/GetArticles'; 
    private _getUserIDUrl = 'Manage/GetUserID'; 
    private _getUserIsAuth = 'Manage/GetUserIsAuthenticated'; 
    private _getUserNameUrl = 'Manage/GetUserName'; 

    //private _todolist: Models.List[];
    private _articles: Article[]; 
    private _userID : string; 
    private _isAuth : boolean; 
    private _userName : string; 
    private _user : User; 
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

    GetUser() : User
    {
        this._user = new User(); 
        
        this._user.ID = this.GetUserID(); 
        this._user.isAuthenticated = this.GetUserIsAuthenticated(); 
        this._user.Name = this.GetUserName(); 

        return this._user; 
    }

    GetUserIsAuthenticated() : boolean
    {
        this.getaction<string>(this._getUserIsAuth).subscribe(
            result => {
                this._isAuth = result; 
            },
            error => this.errormsg = error
        );

        return this._isAuth; 
    }

    GetUserID() : string
    {
        this.getaction<string>(this._getUserIDUrl).subscribe(
            result => {
                this._userID = result; 
            },
            error => this.errormsg = error); 

        return this._userID; 
    }

    GetUserName() : string
    {
        this.getaction<string>(this._getUserNameUrl).subscribe(
            result => {
                this._userName = result; 
            },
            error => this.errormsg = error); 

        return this._userName; 
    }

    GetArticles(subverse : string) : Observable<Article[]>
    {
        console.log("GetArticles URL: " + this._getArticlesUrl + "/?subverse="+subverse);

        return this.http.get(this._getArticlesUrl + "/?subverse="+subverse)
                    .map(this.extractData)
                    .catch(this.handleError);

    }

    private extractData(res: Response) 
    {
        let body = res.json();
        return body.data || { };
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

    AddArticle(article: Article) {
        console.log("AddArticle: title " + article.title); 
        this.postaction(article, this._getArticlePostUrl).subscribe(
            result => {
                
                    this._articles.push(article);
                
            }, error => this.errormsg = error);
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
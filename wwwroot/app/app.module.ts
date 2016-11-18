import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ArticleComponent } from './article/article.component';
import { SubverseComponent } from './subverse/subverse.component'; 
import { HomeComponent } from './home/home.component';
import { ArticlePageComponent } from './articlepage/articlepage.component';

import {RouterModule, Routes} from '@angular/router'

const routes: Routes = [
    { path: '', component : HomeComponent },
    { path: 'r/:id', component : SubverseComponent },
    { path: 'article/:id', component : ArticlePageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    ArticlePageComponent,
    SubverseComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  exports: [
    RouterModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

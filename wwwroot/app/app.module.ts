import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ArticleComponent } from './article/article.component';
import { SubverseComponent } from './subverse/subverse.component'; 

import {RouterModule, Routes} from '@angular/router'

const routes: Routes = [
    { path: '', redirectTo: '/r/home', pathMatch:'full' },
    { path: 'r/:id', component : SubverseComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent // <-- added this
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

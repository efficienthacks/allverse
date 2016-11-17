using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using WebApplication.Models.app; 
using Npoco; 

namespace WebApplication.Controllers
{
    [Route("api/article")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true, Duration = -1)]
    public class ArticleController : ApiController
    {

        private IDatabase GetDB()
        {
            string pgsqlConnStr = Configuration["PostgresConn"];
            IDatabase db = new Database(pgsqlConnStr); 
            return db; 
        }

        public Int64 Post(ArticleModel article)
        {
            using(IDatabase db = GetDB())
            {
                db.Insert(article); 
            }
            return article.id; 
        }

        public List<ArticleModel> Get(string subverse)
        {
            using(IDatabase db = GetDB())
            {
                List<ArticleModel> articles = db.Fetch<ArticleModel>("select * from article where subverse='"+subverse+"'"); 
            }

            return articles; 
        }

    }
}
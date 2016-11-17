using System;
using System.Collections.Generic;
using System.Data.Common; 
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Mvc;
using WebApplication.Models.app; 
using NPoco; 
using Npgsql;

namespace WebApplication.Controllers
{
    [Route("api/article")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true, Duration = -1)]
    public class ArticleController : Controller
    {
        IConfiguration config; 
        public ArticleController(IConfiguration config)
        {
            this.config = config; 
        }

        private IDatabase GetDB()
        {
            string pgsqlConnStr = config["PostgresConn"];
            IDatabase db = new Database(new NpgsqlConnection(pgsqlConnStr)); 
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
            List<ArticleModel> articles = null; 
            
            using(IDatabase db = GetDB())
            {
                articles = db.Fetch<ArticleModel>("select * from article where subverse='"+subverse+"'"); 
            }

            return articles; 
        }

    }
}
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
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true, Duration = -1)]
    public class ArticleController : Controller
    {
        public ArticleController()
        {
            
        }

        private IDatabase GetDB()
        {
            string pgsqlConnStr = Startup.Configuration["PostgresConn"];
            IDatabase db = new Database(new NpgsqlConnection(pgsqlConnStr), DatabaseType.PostgreSQL, NpgsqlFactory.Instance); 
            return db; 
        }

        [HttpPost]
        public JsonResult Post([FromBody] ArticleModel article)
        {
            using(IDatabase db = GetDB())
            {
                try
                {
                    article.id = (long)db.Insert(article); 
                }
                catch(Exception ex)
                {
                    string m = ex.Message;
                    string im = ex.InnerException.ToString(); 
                }
            }
            return Json(article); 
        }

        [HttpGet]
        public JsonResult GetArticle(long id)
        {
            ArticleModel a = null; 
            using (IDatabase db = GetDB())
            {
                a = db.SingleById<ArticleModel>(id); 
            }
            return Json(a); 
        }

        [HttpGet] 
        public JsonResult GetArticles(string subverse)
        {
            try
            {
                List<ArticleModel> articles = null; 
                
                using(IDatabase db = GetDB())
                {
                    string sqlCommand=@"SELECT * FROM public.article where subverse='"+subverse+"'";
                    articles = db.Fetch<ArticleModel>(sqlCommand); 
                }

                return Json(articles); 
            }
            catch(Exception ex)
            {
                throw ex; 
            }

            //return Json(""); 
        }

    }
}
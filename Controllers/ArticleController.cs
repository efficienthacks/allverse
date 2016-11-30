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

        [HttpPost]
        public JsonResult PostComment([FromBody] CommentModel comment)
        {
            using(IDatabase db = GetDB())
            {
                try
                {
                    comment.id = (long)db.Insert(comment); 
                }
                catch(Exception ex)
                {
                    string m = ex.Message;
                    string im = ex.InnerException.ToString(); 
                }
            }
            return Json(comment); 
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

        [HttpGet] 
        public JsonResult GetComments(Int64 ArticleID)
        {
            try
            {
                List<CommentModel> comments = null; 

                using(IDatabase db = GetDB())
                {
                    string sqlCommand=@"SELECT * FROM public.comment where ""articleID""="+ArticleID.ToString();
                    // fetch all comments in article 
                    comments = db.Fetch<CommentModel>(sqlCommand); 
                    // form comments into comment tree
                    comments = commentTree(comments); 
                }

                return Json(comments); 
            }
            catch(Exception ex)
            {
                throw ex; 
            }
        }
    }

    private List<CommentModel> commentTree(List<CommentModel> comments)
    {
        Dictionary<Int64, CommentModel> dict = new Dictionary<Int64, CommentModel>();

        foreach(var c in comments)
        {
            dict.Add(c.id,c); 
            c.comments = new List<CommentModel>(); 
        }

        List<CommentModel> rootNodes = new List<CommentModel>(); 

        foreach(var c in comments)
        {
            //if parent
            if (c.level==0)
            {
                rootNodes.Add(c); 
            }
            else
            {
                if (!dict.ContainsKey(c.parentCommentID))
                {
                    
                }
            }
        }

        return rootNodes; 
    }
}
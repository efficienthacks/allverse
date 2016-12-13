using System;
using System.Collections.Generic;
using System.Data.Common; 
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Mvc;
using WebApplication.Models.app; 
using NPoco; 
using Npgsql;
using Newtonsoft.Json; 

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
        public JsonResult UpdateComment([FromBody] CommentModel comment)
        {
            using(IDatabase db = GetDB())
            {
                try
                {
                    db.Update(comment); 
                }
                catch(Exception ex)
                {
                    string m = ex.Message;
                    string im = ex.InnerException.ToString(); 
                }
            }
            return Json(comment); 
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
        public JsonResult GetArticle(long id, string userID)
        {
            ArticleModel a = null; 
            VoteModel v = null; 
            using (IDatabase db = GetDB())
            {
                try
                {
                    a = db.SingleById<ArticleModel>(id); 
                }
                catch(Exception ex)
                {
                    string m = ex.Message; 
                }
                

                if (userID != null)
                {
                    try
                    {
                        v = db.First<VoteModel>("select * from uservotes where \"articleid\"=" + id + " and \"userid\"='"+userID+"'"); 
                        a.userVote = v.vote; 
                    }
                    catch(Exception ex)
                    {
                        string m = ex.Message;
                    }
                }

            }
            return Json(a); 
        }

        [HttpGet] 
        public JsonResult GetArticles(string subverse, string userID)
        {
            try
            {
                List<ArticleModel> articles = null; 
                
                using(IDatabase db = GetDB())
                {
                    string sqlCommand=@"SELECT * FROM public.article where subverse='"+subverse+"'";
                    articles = db.Fetch<ArticleModel>(sqlCommand); 

                    if (userID != null)
                    {
                        foreach(var a in articles)
                        {
                            try
                            {
                                VoteModel v = db.First<VoteModel>("select * from uservotes where \"articleid\"=" + a.id + " and \"userid\"='"+userID+"'"); 
                                a.userVote = v.vote; 
                            }
                            catch(Exception ex)
                            {
                                string m = ex.Message; 
                            }

                        }
                    }

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
        public JsonResult DeleteArticle(Int64 articleID)
        {
            using (IDatabase db = GetDB())
            {
                try
                {
                    ArticleModel a = db.SingleById<ArticleModel>(articleID); 
                    db.Delete(a); 
                }
                catch(Exception ex)
                {
                    string m = ex.Message; 
                }

                return Json(true); 
            }
            return Json(false); 
        }

        [HttpGet] 
        public JsonResult GetComments(Int64 ArticleID, string userID)
        {
            try
            {
                List<CommentModel> comments = null; 
                List<CommentModel> rootNodes = null; 

                using(IDatabase db = GetDB())
                {
                    string sqlCommand=@"SELECT * FROM public.comment where ""articleID""="+ArticleID.ToString();
                    // fetch all comments in article 
                    comments = db.Fetch<CommentModel>(sqlCommand); 
                    // get user vote for each comment 
                    if (userID != "")
                    {
                        comments = fetchUserVotes(comments, userID); 
                    }
                    // form comments into comment tree
                    rootNodes = commentTree(comments); 
                }

                return Json(rootNodes); 
                //return JsonConvert.SerializeObject(rootNodes); 
            }
            catch(Exception ex)
            {
                throw ex; 
            }
        }

        private List<CommentModel> fetchUserVotes(List<CommentModel> comments, string userID)
        {
            using (IDatabase db = GetDB())
            {
                foreach(var c in comments)
                {
                    try
                    {
                        VoteModel v = db.First<VoteModel>("select * from uservotes where \"commentid\"=" + c.id + " and \"userid\"='"+userID+"'");  
                        c.userVote = v.vote; 
                    }
                    catch(Exception ex)
                    {
                        string m = ex.Message;
                    }
                }
            }

            return comments; 
        }

        private List<CommentModel> commentTree(List<CommentModel> comments)
        {
            Dictionary<Int64, CommentModel> dict = new Dictionary<Int64, CommentModel>();

            foreach(CommentModel c in comments)
            {
                c.time_ago = timeSince(c.time);  
                dict.Add(c.id,c); 
                c.comments = new List<CommentModel>(); 
            }

            List<CommentModel> rootNodes = new List<CommentModel>(); 

            foreach(var node in comments)
            {
                //if parent
                if (node.level==0)
                {
                    rootNodes.Add(node); 
                }
                else
                {
                    if (!dict.ContainsKey(node.parentCommentID))
                    {
                        continue; 
                    }

                    node.parent = dict[node.parentCommentID];
                    node.parent.comments.Add(node); 
                }
            }

            return rootNodes; 
        }

        private string timeSince(Int64 date) 
        {
            const int SECOND = 1;
            const int MINUTE = 60 * SECOND;
            const int HOUR = 60 * MINUTE;
            const int DAY = 24 * HOUR;
            const int MONTH = 30 * DAY;
            long nowTime = ((date * 10000) + 621355968000000000);

            var ts = new TimeSpan(DateTime.UtcNow.Ticks - nowTime);
            double delta = Math.Abs(ts.TotalSeconds);

            if (delta < 1 * MINUTE)
            return ts.Seconds == 1 ? "one second ago" : ts.Seconds + " seconds ago";

            if (delta < 2 * MINUTE)
            return "a minute ago";

            if (delta < 45 * MINUTE)
            return ts.Minutes + " minutes ago";

            if (delta < 90 * MINUTE)
            return "an hour ago";

            if (delta < 24 * HOUR)
            return ts.Hours + " hours ago";

            if (delta < 48 * HOUR)
            return "yesterday";

            if (delta < 30 * DAY)
            return ts.Days + " days ago";

            if (delta < 12 * MONTH)
            {
            int months = Convert.ToInt32(Math.Floor((double)ts.Days / 30));
            return months <= 1 ? "one month ago" : months + " months ago";
            }
            else
            {
            int years = Convert.ToInt32(Math.Floor((double)ts.Days / 365));
            return years <= 1 ? "one year ago" : years + " years ago";
            }

        }

    }//article controller
}
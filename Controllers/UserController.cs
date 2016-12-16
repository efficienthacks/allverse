using System;
using System.Collections.Generic; 
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WebApplication.Models;
using WebApplication.Models.app; 
using WebApplication.Services;
using NPoco; 
using Npgsql; 

namespace WebApplication.Controllers
{
    public class UserController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IEmailSender _emailSender;
        private readonly ISmsSender _smsSender;
        private readonly ILogger _logger;

        private IDatabase _db = new Database(new NpgsqlConnection(Startup.Configuration["PostgresConn"]), DatabaseType.PostgreSQL, NpgsqlFactory.Instance); 

        private IDatabase GetDB()
        {
            return _db; 
        }

        public UserController(
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager,
        IEmailSender emailSender,
        ISmsSender smsSender,
        ILoggerFactory loggerFactory)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _emailSender = emailSender;
            _smsSender = smsSender;
            _logger = loggerFactory.CreateLogger<ManageController>();
        }

        [HttpGet]
        public JsonResult GetMods(string subverse)
        {
            List<UserSubsModel> mods = null; 
            string query = String.Format("select * from usersubs where \"ismod\"=1 and \"subverseName\"='{0}'", subverse);
            using(IDatabase db = GetDB())
            {
                try
                {
                    mods = db.Fetch<UserSubsModel>(query);
                }
                catch(Exception ex)
                {
                    string m = ex.Message;
                }
                
            } 
            return Json(mods); 
        }

        [HttpGet]
        public JsonResult GetUser()
        {
            var user = new UserModel(); 
            try
            {
                user.isAuthenticated = User.Identity.IsAuthenticated;
                user.ID = _userManager.GetUserId(HttpContext.User); 
                user.Name = User.Identity.Name; 
            }
            catch(Exception ex)
            {
                user.isAuthenticated=false;
                user.ID=null;
                user.Name=null; 
            }

            return Json(user); 
        }

        [HttpGet]
        public JsonResult AddMod(string userName, string subverse)
        {
            
            string query = String.Format(@"select ""Id"" from public.""AspNetUsers"" where ""UserName""='{0}'",userName.Replace("@","@@")); 
            string uid = null;

            using (IDatabase db = GetDB())
            {
                try
                {
                    uid = db.ExecuteScalar<string>(query); 
                }
                catch(Exception ex)
                {
                    string m = ex.Message; 
                }
                
            }

            return BecomeMod(uid,userName,subverse); 
        }

        [HttpGet]
        public JsonResult GetSubscriberCount(string subverse)
        {
            
            string query = String.Format("SELECT count(*)	FROM public.usersubs where \"subverseName\"='{0}'", subverse); 
            int count = 0; 

            using (IDatabase db = GetDB())
            {
                try
                {
                    count = db.ExecuteScalar<int>(query); 
                }
                catch(Exception ex)
                {
                    string m = ex.Message; 
                }
                
            }

            return Json(count); 
        }


        [HttpGet]
        public JsonResult BecomeMod(string UserID,string UserName, string subverse)
        {
            UserSubsModel u = null; 
            using(IDatabase db = GetDB())
            {
                string query = String.Format("select * from usersubs where \"userID\"='{0}'", UserID); 
                
                try
                {
                    u=db.Single<UserSubsModel>(query);               
                } 
                catch(Exception ex)
                {
                    string m = ex.Message; 
                }

                if (u!=null)
                {
                    u.ismod = 1; 
                    db.Update(u); 
                }
                else // doesn't exist in the DB 
                {
                    u = new UserSubsModel(); 
                    u.ismod = 1; 
                    //auto subscribe if is mod
                    u.isSubscribed = 1; 
                    u.userID = UserID; 
                    u.subverseName = subverse; 
                    u.userName = UserName; 
                    Int64 result=0;
                    try
                    {
                        result = (Int64)db.Insert(u); 
                    }
                    catch(Exception ex)
                    {
                        string m = ex.Message; 

                    }
                    
                }
            }
            return Json(u); 
        }

        [HttpGet]
        public JsonResult IsSubscribed(string UserID, string subverse)
        {
            int isSubscribed=0; 

            UserSubsModel u = null; 
            using(IDatabase db = GetDB())
            {
                string query = String.Format("select * from usersubs where \"userID\"='{0}' and \"subverseName\"='{1}'", UserID, subverse); 
                
                try
                {
                    u=db.Single<UserSubsModel>(query);               
                }            
                catch(Exception ex)
                {
                    string m = ex.Message; 
                }

                if (u != null)
                {
                    isSubscribed = u.isSubscribed;
                }
                //else 0 is already implied 
            }

            return Json(isSubscribed); 
        }

        [HttpGet]
        public JsonResult ToggleSubscribe(string UserID,string UserName, string subverse)
        {
            UserSubsModel u = null; 
            using(IDatabase db = GetDB())
            {
                string query = String.Format("select * from usersubs where \"userID\"='{0}'", UserID); 
                
                try
                {
                    u=db.Single<UserSubsModel>(query);               
                } 
                catch(Exception ex)
                {
                    string m = ex.Message; 
                }

                if (u!=null)
                {
                    // if it exists, toggle it (users sub)
                    if (u.isSubscribed == 0)
                    {
                        u.isSubscribed = 1; 
                    }
                    else
                    {
                        u.isSubscribed = 0; 
                    }
                    db.Update(u); 
                }
                else // doesn't exist in the DB, add it as subscribed
                {
                    u = new UserSubsModel(); 
                    u.ismod = 0; 
                    u.isSubscribed = 1; 
                    u.userID = UserID; 
                    u.subverseName = subverse; 
                    u.userName = UserName; 
                    Int64 result=0;
                    try
                    {
                        result = (Int64)db.Insert(u); 
                    }
                    catch(Exception ex)
                    {
                        string m = ex.Message; 
                    }
                    
                }
            }
            return Json(u); 
        }

        /*vote should either be -1 or 1*/
        [HttpGet]
        public JsonResult VoteArticle(long ArticleID, string userID, int vote)
        {
            VoteModel v = new VoteModel();

            try
            {
                DeleteVote(ArticleID, userID); 
            }
            catch(Exception ex)
            {
                string m = ex.Message; 
            }

            try
            {
                v.articleid = ArticleID; 
                v.userid = userID; 
                v.commentid = 0;
                v.vote = vote; 

                PostVote(ref v); 
            }
            catch(Exception ex)
            {
                string m = ex.Message; 
            }

            return Json(v); 
        }

        /*vote should either be -1 or 1*/
        [HttpGet]
        public JsonResult VoteComment(long CommentID, string userID, int vote)
        {
            VoteModel v = new VoteModel();

            try
            {
                DeleteCommentVote(CommentID, userID); 
            }
            catch(Exception ex)
            {
                string m = ex.Message; 
            }

            try
            {
                v.articleid = 0; 
                v.userid = userID; 
                v.commentid = CommentID;
                v.vote = vote; 

                PostVote(ref v); 
            }
            catch(Exception ex)
            {
                string m = ex.Message; 
            }

            return Json(v); 
        }

        
        [HttpGet]
        public JsonResult DeleteVote(long ArticleID, string userID)
        {
            int result=0; 
            using(IDatabase db = GetDB())
            {
                string query = String.Format(@"delete from uservotes where ""articleid""={0} and ""userid""='{1}'",ArticleID,userID); 
                try
                {
                    result = db.Execute(query);
                }
                catch(Exception ex)
                {
                    string m = ex.Message; 
                }
                 
            }
            return Json(result); 
        }

        [HttpGet]
        public JsonResult DeleteCommentVote(long CommentID, string userID)
        {
            int result=0; 
            using(IDatabase db = GetDB())
            {
                string query = String.Format(@"delete from uservotes where ""commentid""={0} and ""userid""='{1}'",CommentID,userID); 
                try
                {
                    result = db.Execute(query);
                }
                catch(Exception ex)
                {
                    string m = ex.Message; 
                }
                 
            }
            return Json(result); 
        }

        
        // vote up or down article or comment 
        [HttpPost]
        private void PostVote(ref VoteModel v)
        {
            // insert vote 
            using(IDatabase db = GetDB())
            {
                try
                {
                    v.id = (long)db.Insert(v); 
                }
                catch(Exception ex)
                {
                    string m = ex.Message;
                    string im = ex.InnerException.ToString(); 
                }

                //apply to comment or article 
                if (v.articleid > 0)
                {
                    ArticleModel a = db.Single<ArticleModel>(@"select * from article where id="+v.articleid);
                    a.votes += v.vote; 
                    db.Update(a);  
                }
                //otherwise comment 
                else if (v.commentid > 0)
                {
                    CommentModel c = db.Single<CommentModel>(@"select * from comment where id="+v.commentid); 
                    c.votes += v.vote; 
                    db.Update(c); 
                }
            }
        }
    }
}

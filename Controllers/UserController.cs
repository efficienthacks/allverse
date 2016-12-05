using System;
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
    [Authorize]
    public class UserController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IEmailSender _emailSender;
        private readonly ISmsSender _smsSender;
        private readonly ILogger _logger;

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

        private IDatabase GetDB()
        {
            string pgsqlConnStr = Startup.Configuration["PostgresConn"];
            IDatabase db = new Database(new NpgsqlConnection(pgsqlConnStr), DatabaseType.PostgreSQL, NpgsqlFactory.Instance); 
            return db; 
        }

        [HttpGet]
        public JsonResult GetUser()
        {
            var user = new UserModel(); 
            user.isAuthenticated = User.Identity.IsAuthenticated;
            user.ID = _userManager.GetUserId(HttpContext.User); 
            user.Name = User.Identity.Name; 
            return Json(user); 
        }

        // vote up or down article or comment 
        public JsonResult UserCastVote(string userID, long articleID,long commentID, int vote)
        {
            // either articleID or commentID is 0, the other is the ID 
            VoteModel v = new VoteModel(); 
            v.articleid = articleID; 
            v.userid = userID; 
            v.commentid = commentID;
            v.vote = vote; // vote should be either 1 or -1

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
                //commentid==0 mean article 
                if (v.commentid == 0)
                {
                    ArticleModel a = db.Single<ArticleModel>(@"select * from article where id="+v.articleid);
                    a.votes += v.vote; 
                    db.Update(a);  
                }
                //otherwise comment 
                else
                {
                    CommentModel c = db.Single<CommentModel>(@"select * from comment where id="+v.commentid); 
                    c.votes += v.vote; 
                    db.Update(c); 
                }
            }

            return Json(v); 
        }
    }
}

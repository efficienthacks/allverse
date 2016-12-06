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

        [HttpGet]
        public JsonResult DeleteVote(long ArticleID, string userID)
        {
            int result=0; 
            using(IDatabase db = GetDB())
            {
                string query = String.Format(@"delete from uservotes where ""articleid""=""{0}"" and ""userid""=""{1}""",articleid,userID); 
                result = db.Execute(query); 
            }
            return Json(result); 
        }

        // vote up or down article or comment 
        [HttpPost]
        public JsonResult PostVote([FromBody] VoteModel v)
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
                //commentid==0 mean article 
                if (v.commentid == 0 && v.articleid > 0)
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

            return Json(v); 
        }
    }
}

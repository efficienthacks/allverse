
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using WebApplication.Models.app; 
using NPoco; 
using Npgsql;

namespace WebApplication.Controllers
{
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true, Duration = -1)]
    public class SubverseController : Controller
    {
        private IDatabase _db = new Database(new NpgsqlConnection(Startup.Configuration["PostgresConn"]), DatabaseType.PostgreSQL, NpgsqlFactory.Instance); 

        private IDatabase GetDB()
        {
            return _db; 
        }

        public SubverseController()
        {
            
        }

        [HttpGet]
        public JsonResult GetAllSubs()// for future: int numArticlesPerPage, int numLoaded
        {
            string query = String.Format("SELECT distinct \"subverseName\" FROM public.usersubs");
            List<string> subs = new List<string>(); 

            using (IDatabase db = GetDB())
            {
                subs = db.Fetch<string>(query); 
            }

            return Json(subs); 
        }


    }//subverse controller
}
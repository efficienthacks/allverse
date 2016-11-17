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


        public void Post(ArticleModel article)
        {
            using(IDatabase db = GetDB())
            {
                db.Insert(article); 
            }
        }


    }
}
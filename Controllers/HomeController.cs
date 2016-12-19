using System;
using System.Collections.Generic; 
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WebApplication.Models;
using WebApplication.Models.app; 
using WebApplication.Services;
using NPoco; 
using Npgsql; 
using WebApplication.Data; 

///////////
using Microsoft.EntityFrameworkCore;

namespace WebApplication.Controllers
{
    public class HomeController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private ApplicationDbContext _context; 

        private System.Threading.Tasks.Task<Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRole> _siteAdminRole;
        private Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRole _unboxedSiteAdminRole;

        public HomeController(
        UserManager<ApplicationUser> userManager,
        ApplicationDbContext context)
        {
            _userManager = userManager;
            _context = context; 
        }
        public async System.Threading.Tasks.Task<ApplicationUser> GetApplicationUser(Microsoft.AspNetCore.Http.HttpContext c)
        {
            return await _userManager.GetUserAsync(c.User); 
        }

        public IActionResult Index()
        {
            //SetupSiteAdmins(HttpContext); --uncomment and custom add user names to be site admins
            return View();
        }

        public void SetupSiteAdmins(Microsoft.AspNetCore.Http.HttpContext context)
        {
            var RoleName = "SITEADMIN"; 

            _siteAdminRole = _context.Roles.SingleAsync(p => p.Name == RoleName);
            
            try
            {
                _siteAdminRole.Wait(); 
                // add site admin role if doesn't exist
                if (_siteAdminRole.Result == null)
                {
                    _unboxedSiteAdminRole = _siteAdminRole.Result; 
                }
            }
            catch(Exception ex)
            {
                var idRole = new Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRole();
                idRole.Name = RoleName; 
                idRole.NormalizedName = RoleName; 

                _context.Roles.Add(idRole); 
                _context.SaveChanges(); 
                string m = ex.Message; 
            }

            try
            {
                _siteAdminRole = _context.Roles.SingleAsync(p => p.Name == RoleName);
                _siteAdminRole.Wait(); 
                _unboxedSiteAdminRole = _siteAdminRole.Result; 
            }
            catch(Exception ex)
            {
                string m = ex.Message; 
                string m2 = ex.InnerException.Message; 
            }

            System.Threading.Tasks.Task<ApplicationUser> user = GetApplicationUser(context); 


            try
            {
                user.Wait(); 
                var user2 = user.Result; 
                var isinrole= _userManager.IsInRoleAsync(user2, RoleName);
                isinrole.Wait(); 
                var bInRole = isinrole.Result; 

                if (user2.UserName=="claysmithr" && !bInRole)
                {
                    var adduser = _userManager.AddToRoleAsync(user2,RoleName); 
                    adduser.Wait(); 
                    var ur2 = adduser.Result; 
                }
            }
            catch(Exception ex)
            {
                string m = ex.Message; 
                string m2 = ex.InnerException.Message; 
            }
            
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}

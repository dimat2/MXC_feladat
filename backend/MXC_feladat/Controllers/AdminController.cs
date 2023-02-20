using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MXC_feladat.Data;
using MXC_feladat.Data.Models;
using MXC_feladat.Infrastructure;
using MXC_feladat.Models.Admin;
using MXC_feladat.Models.Identity;

namespace MXC_feladat.Controllers
{
    [Authorize(Roles = "admin")]
    public class AdminController : ApiController
    {
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly UserManager<User> userManager;

        private readonly ApplicationDbContext data;


        public AdminController(RoleManager<IdentityRole> roleManager, UserManager<User> userManager, ApplicationDbContext data)
        {
            this.roleManager = roleManager;
            this.userManager = userManager;
            this.data = data;
        }

        [HttpGet]
        [Route(nameof(GetList))]
        public async Task<IEnumerable<UsersInRoleViewModel>> GetList()
        {
            return await (from user in data.Users
                          join userRoles in data.UserRoles on user.Id equals userRoles.UserId
                          join role in data.Roles on userRoles.RoleId equals role.Id
                          select new UsersInRoleViewModel { UserName = user.UserName, Email = user.Email, RoleName = role.Name })
                        .ToListAsync();
        }

        [HttpGet]
        [Route(nameof(GetUsers))]
        public async Task<IEnumerable<User>> GetUsers()
        {
            return await userManager.Users.ToListAsync();
        }

        [HttpGet]
        [Route(nameof(GetRoles))]
        public async Task<IEnumerable<IdentityRole>> GetRoles()
        {
            return await roleManager.Roles.ToListAsync();
        }


        [HttpDelete("{userName}/{roleName}")]
        public async Task<ActionResult> DeleteRole(string userName, string roleName)
        {
            var user = await userManager.FindByNameAsync(userName);

            if (user == null)
            {
                return BadRequest();
            }

            var result = await userManager.RemoveFromRoleAsync(user, roleName);
            if (result.Succeeded)
            {
                return Ok();
            }

            return BadRequest(result.Errors);
        }
    }
}

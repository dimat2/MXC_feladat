using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MXC_feladat.Data.Models;
using MXC_feladat.Models.Identity;

namespace MXC_feladat.Controllers
{
    public class RoleController : ApiController
    {
        private readonly RoleManager<IdentityRole> roleManager;
        
        public RoleController(RoleManager<IdentityRole> roleManager)
        {
            this.roleManager = roleManager;
        }

        public ActionResult Get()
        {
            return Ok("Roles works.");
        }

        [HttpPost]
        public async Task<ActionResult> Create(IdentityRole model)
        {
            if (!await roleManager.RoleExistsAsync(model.Name))
            {
                await roleManager.CreateAsync(new IdentityRole(model.Name));
            } else
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpGet]
        public async Task<IEnumerable<IdentityRole>> GetList()
        { 
            return await this.roleManager.Roles.ToListAsync();
        }
    }
}

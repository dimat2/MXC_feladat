using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MXC_feladat.Data;
using MXC_feladat.Data.Models;
using MXC_feladat.Models.Identity;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace MXC_feladat.Controllers
{
    public class IdentityController : ApiController
    {
        private readonly UserManager<User> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IOptions<ApplicationSettings> appSettings;

        private readonly ILogger<IdentityController> logger;

        private readonly ApplicationDbContext context;

        public ActionResult Get()
        {
            return Ok("Identity works.");
        }

        public IdentityController(UserManager<User> userManager, IOptions<ApplicationSettings> appSettings, ILogger<IdentityController> logger, ApplicationDbContext context, RoleManager<IdentityRole> roleManager)
        {
            this.userManager = userManager;
            this.appSettings = appSettings;
            this.logger = logger;
            this.context = context;
            this.roleManager = roleManager;             
        }

        [Route(nameof(Register))]
        public async Task<ActionResult> Register(RegisterRequestModel model)
        {
            var user = new User
            {
                UserName = model.Username,
                Email = model.Email
            };

            var result = await userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(user, model.Role);

                return Ok();
            }

            return BadRequest(result.Errors);
        }

        [Route(nameof(Login))]
        public async Task<ActionResult<object>> Login(LoginRequestModel model)
        {
            var user = await userManager.FindByNameAsync(model.Username);
            if (user == null)
            {
                return Unauthorized();
            }

            var passwordValid = await userManager.CheckPasswordAsync(user, model.Password);
            if (!passwordValid)
            {
                return Unauthorized();
            }

            Claim claim1 = new Claim(ClaimTypes.NameIdentifier, user.Id);
            Claim claim2 = new Claim(ClaimTypes.Name, user.UserName);

            var roles = await userManager.GetRolesAsync(user);

            var claimsWithRoles = roles.Select(role => new Claim(ClaimTypes.Role, role));

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(appSettings.Value.Secret);


            var tokenDescriptor = new SecurityTokenDescriptor();
            ClaimsIdentity ci = new ClaimsIdentity();
            ci.AddClaim(claim1);
            ci.AddClaim(claim2);
            ci.AddClaims(claimsWithRoles);
            tokenDescriptor.Subject = ci;
            tokenDescriptor.Expires = DateTime.UtcNow.AddDays(7);
            tokenDescriptor.SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature);

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var encryptedToken = tokenHandler.WriteToken(token);

            var log = new Log
            {
                UserName = user.UserName,
                Mikor = DateTime.Now,
                Esemeny = "Sikeres belépés."
            };

            this.context.Log.Add(log);
            await this.context.SaveChangesAsync();

            logger.LogInformation($"Sikeres belépés: {DateTime.Now} - {model.Username}");

            return new
            {
                Token = encryptedToken
            };
        }
    }
}

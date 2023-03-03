using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MXC_feladat.Data;
using MXC_feladat.Data.Models;
using MXC_feladat.Models.Profil;

namespace MXC_feladat.Controllers
{
    public class ProfilController : ApiController
    {
        private readonly UserManager<User> userManager;

        public ProfilController(UserManager<User> userManager)
        {
            this.userManager = userManager;
        }

        [Route(nameof(SavePictures))]
        public async Task<ActionResult> SavePictures(UserProfile model)
        {
            var userName = this.User.Identity.Name;

            var user = await userManager.FindByNameAsync(userName);

            var splited = model.File.Split(new char[] { ',' }, StringSplitOptions.None);

            user.ProfilePicture = Convert.FromBase64String(splited[1]);
            
            await userManager.UpdateAsync(user);

            return Ok();
        }

        [Route(nameof(LoadPictures))]
        public async Task<ActionResult<object>> LoadPictures()
        {
            var userName = this.User.Identity.Name;
            if (userName != null)
            {
                var user = await userManager.FindByNameAsync(userName);

                return new
                {
                    Kep = "data:image/jpeg;base64," + ((user.ProfilePicture != null) ? Convert.ToBase64String(user.ProfilePicture) : "")
                };
            }

            return false;
        }
    }
}

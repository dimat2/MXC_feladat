using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using MXC_feladat.Data.Models;
using MXC_feladat.Models.Password;
using System.Diagnostics;
using System.Net;
using System.Net.Mail;
using System.Text;

namespace MXC_feladat.Controllers
{
    public class PasswordController : ApiController
    {
        private readonly UserManager<User> userManager;
        private readonly IConfiguration _configuration;

        public PasswordController(UserManager<User> userManager, IConfiguration configuration)
        {
            this.userManager = userManager;
            _configuration = configuration;
        }

        [Route(nameof(MailSend))]
        public async Task<ActionResult> MailSend(PasswordRecovery model)
        {
            MailMessage message = new MailMessage("mxc-feladat@proba.hu", model.Email);
            message.IsBodyHtml = true;
            message.Subject = "Elfelejtett jelszó";

            SmtpClient sc = new SmtpClient();
            sc.Host = "smtp.gmail.com";
            sc.Port = 587;
            sc.EnableSsl = true;
            sc.UseDefaultCredentials = false;
            sc.Credentials = new NetworkCredential("petisitecore@gmail.com", "uuwjgvkyjqcllcvh");

            var user = await userManager.FindByEmailAsync(model.Email);

            if (user != null)
            {
                var token = await userManager.GeneratePasswordResetTokenAsync(user);

                byte[] tokenBytes = Encoding.UTF8.GetBytes(token);
                token = WebEncoders.Base64UrlEncode(tokenBytes);

                message.Body = "<a target = \"_blank\" href=\"" + _configuration.GetSection("ServerName").Get<ServerName>().DefaultName + token + "/" + user.Id + "\">Jelszó visszaállítása</a>";

                await sc.SendMailAsync(message);

                return Ok();
            }

            return NotFound();
        }

        [Route(nameof(VerifyReset))]
        public async Task<ActionResult<bool>> VerifyReset(VerifyResetPassword model)
        {
            var user = await userManager.FindByIdAsync(model.UserId);

            if (user != null)
            {
                byte[] tokenBytes = WebEncoders.Base64UrlDecode(model.ResetToken);
                model.ResetToken = Encoding.UTF8.GetString(tokenBytes);

                return await userManager.VerifyUserTokenAsync(user, userManager.Options.Tokens.PasswordResetTokenProvider, "ResetPassword", model.ResetToken);
            }

            return false;
        }
        
        [Route(nameof(UpdatePassword))]
        public async Task<ActionResult> UpdatePassword(CreateNewPasswordRequestModel model)
        {
            var user = await userManager.FindByIdAsync(model.UserId);

            if (user != null)
            {
                byte[] tokenBytes = WebEncoders.Base64UrlDecode(model.ResetToken);
                model.ResetToken = Encoding.UTF8.GetString(tokenBytes);

                var result = await userManager.ResetPasswordAsync(user, model.ResetToken, model.NewPassword);
                if (result.Succeeded)
                {
                    await userManager.UpdateSecurityStampAsync(user);
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
            }

            return BadRequest();
        }
    }
}

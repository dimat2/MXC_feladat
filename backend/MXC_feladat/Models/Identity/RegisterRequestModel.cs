using System.ComponentModel.DataAnnotations;

namespace MXC_feladat.Models.Identity
{
    public class RegisterRequestModel
    {
        [Required]
        public string Username { get; set; }
        
        [Required]
        public string Email { get; set; }
        
        [Required]
        public string Password { get; set; }
        
        [Required]
        public string Role { get; set; }
    }
}

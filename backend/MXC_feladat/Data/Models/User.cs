using Microsoft.AspNetCore.Identity;

namespace MXC_feladat.Data.Models
{
    public class User : IdentityUser
    {
        public byte[]? ProfilePicture { get; set; }

        public IEnumerable<Esemeny> Esemenyek { get; } = new HashSet<Esemeny>();
    }
}

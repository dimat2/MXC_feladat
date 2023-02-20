using Microsoft.AspNetCore.Identity;

namespace MXC_feladat.Data.Models
{
    public class User : IdentityUser
    {
        public IEnumerable<Esemeny> Esemenyek { get; } = new HashSet<Esemeny>();
    }
}

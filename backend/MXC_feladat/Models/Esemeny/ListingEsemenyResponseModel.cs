using System.ComponentModel.DataAnnotations;

namespace MXC_feladat.Models.Esemeny
{
    public class ListingEsemenyResponseModel
    {
        public int Id { get; set; }

        [Required]
        public string Nev { get; set; }

        [Required]
        public string UserId { get; set; }

        public string UserName { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using static MXC_feladat.Data.Validation.Esemeny;

namespace MXC_feladat.Data.Models
{
    public class Esemeny
    {
        public int Id { get; set; }

        [Required]
        public string Nev { get; set; }

        [Required]
        [MaxLength(MaxHelyszinHossz)]
        public string Helyszin { get; set; }

        public string? Orszag { get; set; }

        [Required]
        public int Kapacitas { get; set; }

        [Required]
        public string UserId { get; set; }

        public User User { get; set; }
    }
}

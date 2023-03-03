using System.ComponentModel.DataAnnotations;
using static MXC_feladat.Data.Validation.Esemeny;

namespace MXC_feladat.Models.Esemeny
{
    public class CreateEsemenyRequestModel
    {
        [Required]
        public string Nev { get; set; }

        [Required]
        [MaxLength(MaxHelyszinHossz)]
        public string Helyszin { get; set; }

        public string? Orszag { get; set; }

        [Required]
        public int Kapacitas { get; set; }

        [Required]
        public bool Elvegzett { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

using static MXC_feladat.Data.Validation.Esemeny;

namespace MXC_feladat.Models.Esemeny
{
    public class UpdateEsemenyRequestModel
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
    }
}

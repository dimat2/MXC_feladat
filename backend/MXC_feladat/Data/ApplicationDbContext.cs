using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MXC_feladat.Data.Models;
using System.Runtime.CompilerServices;

namespace MXC_feladat.Data
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Esemeny> Esemenyek { get; set; }
        public DbSet<Log> Log { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder
                .Entity<Esemeny>()
                .HasOne(e => e.User)
                .WithMany(u => u.Esemenyek)
                .HasForeignKey(e => e.UserId);

            base.OnModelCreating(builder);
        }
    }
}

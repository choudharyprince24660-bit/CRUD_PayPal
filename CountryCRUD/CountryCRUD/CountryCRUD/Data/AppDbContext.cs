using CountryCRUD.Models;
using Microsoft.EntityFrameworkCore;

namespace CountryCRUD.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Country> Countries { get; set; }
    }
}

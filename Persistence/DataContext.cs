using System;
using System.Collections.Generic;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        { }
        public DbSet<Locality> Localities { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new LocalityConfiguration());

            modelBuilder.Entity<Locality>().HasData(
                new Locality() { Id = 1, LocalityName = "Title1" },
                new Locality() { Id = 11, LocalityName = "Child11", Category = 'Ñ' , ParentId = 1},
                new Locality() { Id = 111, LocalityName = "Child111", ParentId = 11},
                new Locality() { Id = 12, LocalityName = "Child12", Category = 'Ù', ParentId = 1 },
                new Locality() { Id = 2, LocalityName = "Title2" },
                new Locality() { Id = 21, LocalityName = "Child21", Category = 'Ò', ParentId = 2 },
                new Locality() { Id = 22, LocalityName = "Child22", Category = 'Ñ', ParentId = 2 }
            );
        }
    }
}

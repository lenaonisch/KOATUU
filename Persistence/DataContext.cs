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
                new Locality() { Id = 1, Title = "Title1" },
                new Locality() { Id = 11, Title = "Child11", Category = 'Ñ' , ParentId = 1},
                new Locality() { Id = 111, Title = "Child111", ParentId = 11},
                new Locality() { Id = 12, Title = "Child12", Category = 'Ù', ParentId = 1 },
                new Locality() { Id = 2, Title = "Title2" },
                new Locality() { Id = 21, Title = "Child21", Category = 'Ò', ParentId = 2 },
                new Locality() { Id = 22, Title = "Child22", Category = 'Ñ', ParentId = 2 }
            );
        }
    }
}

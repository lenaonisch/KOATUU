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
                new Locality() { Id = "0100000000", LocalityName = "Title1" },
                new Locality() { Id = "0100100000", LocalityName = "Child11", Category = 'Ñ' , ParentId = "0100000000" },
                new Locality() { Id = "0100100100", LocalityName = "Child111", ParentId = "0100100000" },
                new Locality() { Id = "0100200000", LocalityName = "Child12", Category = 'Ù', ParentId = "0100000000" },
                new Locality() { Id = "0200000000", LocalityName = "Title2" },
                new Locality() { Id = "0200100000", LocalityName = "Child21", Category = 'Ò', ParentId = "0200000000" },
                new Locality() { Id = "0200200000", LocalityName = "Child22", Category = 'Ñ', ParentId = "0200000000" }
            );
        }
    }
}

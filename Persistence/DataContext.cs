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

        public DbSet<Activity> Activities { get; set; }
        public DbSet<Locality> Localities { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Locality>().HasData(
                new Locality()
                {
                    Id = 1, Title = "Title1", Children = new List<Locality>()
                    {
                        new Locality() { Id = 11, Title = "Child11"},
                        new Locality() { Id = 12, Title = "Child12"}
                    }
                },
                new Locality()
                {
                    Id = 2, Title = "Title2", Children = new List<Locality>()
                    {
                        new Locality() { Id = 21, Title = "Child21"},
                        new Locality() { Id = 22, Title = "Child22"}
                    }
                }
            );
        }
    }
}

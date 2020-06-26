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

        public DbSet<LocalityNode> LocalityNodes { get; set; }
        public DbSet<Locality> Localities { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new LocalityConfiguration());

            modelBuilder.Entity<Locality>().HasData(
                new Locality() { Id = 1, Title = "Title1" },
                new Locality() { Id = 11, Title = "Child11" , Category='Ñ'},
                new Locality() { Id = 111, Title = "Child111" },
                new Locality() { Id = 12, Title = "Child12", Category = 'Ù' },
                new Locality() { Id = 2, Title = "Title2" },
                new Locality() { Id = 21, Title = "Child21", Category = 'Ò' },
                new Locality() { Id = 22, Title = "Child22", Category = 'Ñ' }
            );

            modelBuilder.Entity<LocalityNode>().HasData(
                new LocalityNode() { Id = 1, ParentId = 1, ChildId = 11 },
                new LocalityNode() { Id = 2, ParentId = 1, ChildId = 12 },
                new LocalityNode() { Id = 3, ParentId = 11, ChildId = 111 },
                new LocalityNode() { Id = 4, ParentId = 2, ChildId = 21 },
                new LocalityNode() { Id = 5, ParentId = 2, ChildId = 22 }
            );
        }
    }
}

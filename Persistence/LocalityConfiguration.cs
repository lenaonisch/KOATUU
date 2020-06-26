using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence
{
    public class LocalityConfiguration : IEntityTypeConfiguration<Locality>
    {
        public void Configure(EntityTypeBuilder<Locality> builder)
        {
            builder.HasMany(p => p.Children)
                .WithOne(d => d.Parent)
                .HasForeignKey(d => d.ParentId)
                .OnDelete(DeleteBehavior.Cascade);
            builder.Property(p => p.Id).ValueGeneratedNever();
        }
    }
}
using System.Reflection;
using Messenger.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Messenger.Database.Context;

public class MessengerContext : DbContext
{
    public MessengerContext(DbContextOptions<MessengerContext> contextOptions) : base(contextOptions) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Room>()
            .HasMany(r => r.UserRooms)
            .WithOne()
            .HasForeignKey(ur => ur.RoomId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Room>()
            .HasMany(r => r.Messages)
            .WithOne()
            .HasForeignKey(m => m.RoomId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<UserRoom>()
            .HasOne(ur => ur.Room)
            .WithMany(r => r.UserRooms)
            .HasForeignKey(ur => ur.RoomId);

        modelBuilder.Entity<Message>()
            .HasOne(m => m.Room)
            .WithMany(r => r.Messages)
            .HasForeignKey(m => m.RoomId);

        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserToken> UserTokens { get; set; }

    public virtual DbSet<Image> Images { get; set; }

    public virtual DbSet<Room> Rooms { get; set; }

    public virtual DbSet<Message> Messages { get; set; }

    public DbSet<UserRoom> UserRooms { get; set; }
}
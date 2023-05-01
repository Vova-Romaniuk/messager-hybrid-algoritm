using Messenger.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Messenger.Database.Context;

public class MessengerContext : DbContext
{
    public MessengerContext(DbContextOptions<MessengerContext> contextOptions) : base(contextOptions) { }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserToken> UserTokens { get; set; }

    public virtual DbSet<Image> Images { get; set; }

    public virtual DbSet<SeenMessage> SeenMessages { get; set; }

    public virtual DbSet<Room> Rooms { get; set; }

    public virtual DbSet<Message> Messages { get; set; }
}
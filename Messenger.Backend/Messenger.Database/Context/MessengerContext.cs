using Microsoft.EntityFrameworkCore;

namespace Messenger.Database.Context;

public class MessengerContext : DbContext
{
    public MessengerContext(DbContextOptions<MessengerContext> contextOptions) : base(contextOptions) { }
}
namespace Messenger.Core.Entities;

public class Image : Entity
{
    public string ImageUrl { get; set; }

    public Image(string imageUrl)
    {
        ImageUrl = imageUrl;
    }
}
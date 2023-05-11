using AutoMapper;
using Messenger.Core.Entities;
using Messenger.Core.Models;

namespace Messenger.Backend.Mapping;

public class MessagesMapper : Profile
{
    public MessagesMapper()
    {
        CreateMap<Message, MessageDto>();
        CreateMap<Message, MessagePreviewDto>();
    }
}
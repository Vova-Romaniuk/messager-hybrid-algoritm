using AutoMapper;
using Messenger.Core.Models;
using Messenger.Domain.Entities;

namespace Messenger.Backend.Mapping;

public class MessagesMapper : Profile
{
    public MessagesMapper()
    {
        CreateMap<Message, MessageDto>();
        CreateMap<Message, MessagePreviewDto>();
    }
}
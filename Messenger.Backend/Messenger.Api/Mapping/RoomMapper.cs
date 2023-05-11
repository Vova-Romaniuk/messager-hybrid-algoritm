using AutoMapper;
using Messenger.Core.Entities;
using Messenger.Core.Models;

namespace Messenger.Backend.Mapping;

public class RoomMapper : Profile
{
    public RoomMapper()
    {
        CreateMap<Room, RoomDto>()
            .ForMember(x => x.Messages, opts => opts.MapFrom(x => x.Messages))
            .ForMember(x => x.Users, opts => opts.MapFrom(src => src.UserRooms.Select(x => x.User)));
        CreateMap<Room, RoomPreviewDto>()
            .ForMember(x => x.Message, opts => opts.MapFrom(src => src.Messages.LastOrDefault()));
    }
}
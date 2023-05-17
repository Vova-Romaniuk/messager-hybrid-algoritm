using AutoMapper;
using Messenger.Core.Entities;
using Messenger.Core.Models;

namespace Messenger.Backend.Mapping;

public class UserMapper : Profile
{
    public UserMapper()
    {
        CreateMap<UserDto, User>();
        CreateMap<User, UserDto>()
            .ForMember(x => x.Image, opts => opts.MapFrom(x => x.Image.ImageUrl));
    }
}
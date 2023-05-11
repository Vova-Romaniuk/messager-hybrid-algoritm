using MediatR;
using Messenger.Core.Models;

namespace Messenger.Application.Commands;

public class SearchUserCommand : IRequest<IEnumerable<UserDto>>
{
    public SearchUserCommand(string? searchWord)
    {
        this.searchWord = searchWord;
    }

    public string? searchWord { get; set; }
}
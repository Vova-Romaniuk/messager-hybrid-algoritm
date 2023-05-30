namespace Messenger.Backend.Extensions;

public static class DateTimeExtension
{
    public static DateTime ToUkraineTime(this DateTime dateTime)
    {
        var ukraineTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Europe/Kiev");
        var ukraineDateTimeOffset = new DateTimeOffset(dateTime, ukraineTimeZone.GetUtcOffset(dateTime));
        return ukraineDateTimeOffset.DateTime;
    }
}
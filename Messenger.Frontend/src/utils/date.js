import { isToday } from 'date-fns';
import { utcToZonedTime, format } from 'date-fns-tz';

const timeZone = 'Europe/Kiev';

export const formatDate = (inputDate) => {
	const utcDate = new Date(inputDate);
	const zonedDate = utcToZonedTime(utcDate, timeZone);

	return format(zonedDate, 'yyyy-MM-dd HH:mm');
};

export const formatDateTimeToday = (dateTime) => {
	const zonedDateTime = utcToZonedTime(dateTime, timeZone);

	if (zonedDateTime && isToday(zonedDateTime)) {
		// Якщо день є сьогодні, форматуємо тільки години та хвилини
		return format(zonedDateTime, 'HH:mm');
	} else {
		// Якщо день не є сьогодні, форматуємо дату й час
		return format(zonedDateTime, 'dd.MM.yyyy HH:mm');
	}
};

import {
	isFuture,
	getHours,
	parseJSON,
	getMinutes,
	getSeconds,
	getMilliseconds,
} from 'date-fns';
import { IDateInterval } from '../../types/dateInterval';

class ValidateTime {
	public checkValidTime(date: string): boolean {
		const parsedDate = this.parseTime(date);
		const hours = getHours(parsedDate) + 3;
		const minutes = getMinutes(parsedDate);
		const seconds = getSeconds(parsedDate);
		const mili = getMilliseconds(parsedDate);
		console.log(`parsed date: ${parsedDate}, hours: ${hours}, minutes: ${minutes}, seconds: ${seconds}, mili: ${mili}`)
		let valid: boolean;

		if (hours >= 8 && hours <= 16) {
			valid = true;
		} else if (hours === 17 && minutes === 0 && seconds === 0 && mili === 0) {
			valid = true;
		} else {
			valid = false;
		}
		return valid;
	}

	public checkFutureDate(date: string): boolean {
		return isFuture(this.parseTime(date));
	}

	public parseTime(date: string): Date {
		return parseJSON(date);
	}

	public dayInterval(date: string): IDateInterval {
		const parsedDate = this.parseTime(date);
		const initial = parsedDate.toJSON().split('T');
		const init = initial[0].split('-');
		const final = initial[0].split('-');
		const initialInterval = new Date(
			Number(init[0]),
			Number(init[1]) - 1,
			Number(init[2]),
			8 - 3,
			0,
			0,
			0,
		);
		const finalInterval = new Date(
			Number(final[0]),
			Number(final[1]) - 1,
			Number(final[2]),
			17 - 3,
			0,
			0,
			0,
		);
		console.log(`initial Interval: ${initialInterval}`)
		console.log(`final Interval: ${finalInterval}`)
		return {
			initial: initialInterval,
			final: finalInterval,
		};
	}
}

export default new ValidateTime();

import { AppointmentModel } from '../model/index';
import { ValidateTime } from '../../utils/index';

class Appointment {
	async newAppointment(authorId: number, type: string, date: string) {
		if (!(authorId && type && date)) {
			return Promise.reject(
				'All values are necessary to create an appointment',
			);
		}

		const parsedDate = ValidateTime.parseTime(date);
		const validDate = ValidateTime.checkFutureDate(date);
		const validTime = ValidateTime.checkValidTime(date);
		const isAvailable = await AppointmentModel.findTime(parsedDate);
		try {
			if (validDate && isAvailable.length === 0) {
				if (validTime) {
					const newAppointment = await AppointmentModel.createAppointment(
						authorId,
						type,
						parsedDate,
					);
					return Promise.resolve(newAppointment);
				} else {
					return Promise.reject('Appointment must be between 08 AM and 5 PM');
				}
			} else {
				return Promise.reject('This date and time are no available');
			}
		} catch (e: any) {
			return e;
		}
	}

	async getAppointment(id: number) {
		if (!id) {
			return Promise.reject("Inform the appointment's id");
		}
		const appointment = await AppointmentModel.findAppointment(id);

		if (appointment) {
			return Promise.resolve(appointment);
		} else {
			return Promise.reject('Appointment not found');
		}
	}

	async updateAppointment(id: number, type: string) {
		if (!(id && type)) {
			return Promise.reject("Inform the appointment's id and new data");
		}
		const currentAppointment = await this.getAppointment(id);
		if (currentAppointment) {
			const newData = await AppointmentModel.updateAppointment(id, type);
			return Promise.resolve(newData);
		}
		return currentAppointment;
	}

	async deleteAppointment(id: number) {
		if (!id) {
			return Promise.reject("Inform the appointment's id");
		}
		const currentAppointment = await this.getAppointment(id);
		if (currentAppointment) {
			const newData = await AppointmentModel.deleteAppointment(id);
			return Promise.resolve(newData);
		}
		return currentAppointment;
	}

	async getByPatient(authorId: number) {
		if (!authorId) {
			return Promise.reject("Inform the patient's id");
		}
		const patients = await AppointmentModel.filterByPatient(authorId);
		if (patients.length > 0) {
			return Promise.resolve(patients);
		} else {
			return Promise.reject('No appointment found');
		}
	}

	async getByDate(date: string) {
		if (!date) {
			return Promise.reject('Inform the date');
		}

		const dates = ValidateTime.dayInterval(date);

		const patients = await AppointmentModel.filterByDate(
			dates.initial,
			dates.final,
		);
		if (patients.length > 0) {
			return Promise.resolve(patients);
		} else {
			return Promise.resolve('No data found');
		}
	}
}
export default new Appointment();

// fernandas182@gmail.com
// ericaamafabio 

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZlcm5hbmRhczE4MkBnbWFpbC5jb20iLCJuYW1lIjoiRXJpY2EiLCJpZCI6NywiaWF0IjoxNjU3NTc1MTEyLCJleHAiOjE2NTc1NzUyMTJ9.ok20GY8FQCnEonAY_CRq6RSXdlEgaB8B7-S6OEFWdxs


// 5 -> 8 no sistema
// 14 -> 17 no sistema
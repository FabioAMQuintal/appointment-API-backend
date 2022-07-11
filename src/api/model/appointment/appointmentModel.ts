import { connection } from '../index';

class AppointmentModel {
	async createAppointment(authorId: number, type: string, date: Date) {
		const newAppointment = await connection.consulta.create({
			data: {
				author: {
					connect: {
						id: Number(authorId),
					},
				},
				date,
				type,
			},
		});
		return newAppointment;
	}

	async findTime(date: Date) {
		const isOpenDate = await connection.consulta.findMany({
			where: {
				date,
			},
		});
		return isOpenDate;
	}

	async findAppointment(id: number) {
		const appointment = await connection.consulta.findUnique({
			where: {
				id,
			},
		});
		return appointment;
	}

	async updateAppointment(id: number, type: string) {
		const appointment = await connection.consulta.update({
			where: {
				id,
			},
			data: {
				type,
			},
		});
		return appointment;
	}

	async deleteAppointment(id: number) {
		const appointment = await connection.consulta.delete({
			where: {
				id,
			},
		});
		return appointment;
	}

	async filterByPatient(authorId: number) {
		const patients = await connection.consulta.findMany({
			where: {
				authorId: Number(authorId),
			},
			orderBy: {
				id: 'asc',
			},
		});
		return patients;
	}

	async filterByDate(initialDate: Date, finalDate: Date) {
		const patients = await connection.consulta.findMany({
			where: {
				AND: [
					{
						date: {
							gte: initialDate,
						},
					},
					{
						date: {
							lte: finalDate,
						},
					},
				],
			},
			orderBy: {
				date: 'asc',
			},
		});
		return patients;
	}
}

export default new AppointmentModel();

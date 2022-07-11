import { connection } from '../index';

class PatientModel {
	async create(name: string, phone: string) {
		const newPatient = await connection.paciente.create({
			data: {
				name,
				phone,
			},
		});
		return newPatient;
	}

	async findUser(phone: string) {
		const patient = await connection.paciente.findFirst({
			where: {
				phone,
			},
		});
		return patient;
	}
}

export default new PatientModel();

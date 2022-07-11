import { PatientModel } from '../model/index';

class Patient {
	async createPatient(name: string, phone: string) {
		console.log(Number(phone));
		if (!(name && Number(phone))) {
			return Promise.reject(
				'Name and phone are necessary to create an patient. Phone must be only numbers',
			);
		}
		try {
			const patient = await PatientModel.findUser(phone);
			if (!patient) {
				const newPatient = await PatientModel.create(name, phone);
				return Promise.resolve(newPatient);
			} else {
				return Promise.reject('This phone is already been used by a patient');
			}
		} catch (e) {
			return e;
		}
	}

	async findPatient(phone: string) {
		if (!phone) {
			return Promise.reject('Phone is necessary to create an patient');
		}
		const patient = await PatientModel.findUser(phone);
		if (patient) {
			return Promise.resolve(patient);
		} else {
			return Promise.reject("Patient doens't exist");
		}
	}
}

export default new Patient();

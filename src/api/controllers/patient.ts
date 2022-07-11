import { PatientModel } from '../model/index';

class Patient {
	async createPatient(name: string, phone: string) {
		if (!(name && phone)) {
			return Promise.reject(
				'Name and phone are necessary to create an patient',
			);
		}
		const newPatient = await PatientModel.create(name, phone);
		if (newPatient) {
			return Promise.resolve(newPatient);
		} else {
			return Promise.reject('Something went wrong');
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

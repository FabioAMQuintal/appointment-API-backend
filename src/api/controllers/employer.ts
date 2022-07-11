import bcrypt from 'bcrypt';
import { EmployerModel } from '../model/index';

class Employer {
	async createEmployer(email: string, password: string, name: string) {
		if (!(name && email && password)) {
			return Promise.reject('Empty value for email or password');
		}
		try {
			const employerExist = await EmployerModel.findUser(email);
			if (!employerExist) {
				const salt = await bcrypt.genSalt(10);
				const hash = await bcrypt.hash(password, salt);
				const newEmployer = await EmployerModel.create(email, hash, name);
				return Promise.resolve(newEmployer);
			} else {
				return Promise.reject('Something went wrong');
			}
		} catch (e) {
			return e;
		}
	}
}

export default new Employer();

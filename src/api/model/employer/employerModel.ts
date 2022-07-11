import { connection } from '../index';

class EmployerModel {
	async create(email: string, hashed_password: string, name: string) {
		const newEmployer = await connection.functionario.create({
			data: {
				name,
				hash_password: hashed_password,
				email,
			},
		});
		return newEmployer;
	}

	async findUser(email: string) {
		const employer = await connection.functionario.findUnique({
			where: {
				email,
			},
		});
		return employer;
	}
}

export default new EmployerModel();

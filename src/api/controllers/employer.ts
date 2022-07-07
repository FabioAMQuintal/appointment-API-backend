import bcrypt from 'bcrypt';
import { EmployerModel } from '../model/index'

class Employer {

    async createEmployer(email: string, password: string, name: string){
        if(!(email && password)){
            return Promise.reject('Empty value for email or password');
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const newEmployer = await EmployerModel.create(email, hash, name);

        if(newEmployer){
            return Promise.resolve(newEmployer);
        } else {
            return Promise.reject("Something went wrong");
        }
    }
}

export default new Employer();
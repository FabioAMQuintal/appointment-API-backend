import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { EmployerModel } from '../model/index'
import config from '../../config';
import dotenv from "dotenv";
import { IDecodedUser } from '../../types/decodeduser';

class Auth {

    private generateToken(payload: object): string {
        return jwt.sign(payload, config.auth.key as jwt.Secret, {
            expiresIn: config.auth.tokenExpiresIn
        });
    }

    decodeToken(token: string){
        return jwt.verify(token, config.auth.key as jwt.Secret);
    }

    async authenticate(email: string, password: string){
        if(!(email && password)){
            return Promise.reject('Empty value for email or password');
        }
        const user = await EmployerModel.findUser(email);
        const isEqual = await bcrypt.compare(password, user.hash_password);
        if(!user){
            return Promise.reject("User not found");
        }
        if(!isEqual){
            return Promise.reject("Credentials doesn't match");
        }
        
        const token = this.generateToken({ email: user.email, name: user.name, id: user.id });
        console.log(token)
        return token
    }
}

export default new Auth();
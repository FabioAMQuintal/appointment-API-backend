import Employer from '../api/controllers/employer';

export interface IDecodedUser extends Omit<typeof Employer, "_id">{
    id: string;
}
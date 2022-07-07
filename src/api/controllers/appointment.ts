import { AppointmentModel } from '../model/index';
import { isFuture, getHours } from 'date-fns';

class Appointment {

    async newAppointment(authorId: number, type: string, date: Date) {
        if(!(authorId && type && date)){
            return Promise.reject('All values are necessary to create an appointment');
        }
        const hours = getHours(date);
        const validDate = isFuture(date);
        const isAvailable = await AppointmentModel.findTime(date);

        if(validDate && isAvailable){
            if(hours >= 8 || hours <= 17){
                const newAppointment = await AppointmentModel.createAppointment(authorId, type, date);
                return Promise.resolve(newAppointment);
            } else {
                return Promise.reject("Appointment must be between 08 AM and 5 PM");
            }
        } else {
            return Promise.reject("Something went wrong");
        }
    }

    async getAppointment(id: number){
        if(!id){
            return Promise.reject("Inform the appointment's id");
        }
        const appointment = await AppointmentModel.findAppointment(id);

        if(appointment){
            return Promise.resolve(appointment);
        } else {
            return Promise.reject("Appointment not found");
        }
    }

    async updateAppointment(id: number, type: string){
        if(!(id && type)){
            return Promise.reject("Inform the appointment's id and new data");
        }
        const currentAppointment = await this.getAppointment(id);
        if(currentAppointment){
            const newData = await AppointmentModel.updateAppointment(id, type);
            return Promise.resolve(newData);
        }
        return currentAppointment;
    }

    async deleteAppointment(id: number){
        if(!(id)){
            return Promise.reject("Inform the appointment's id");
        }
        const currentAppointment = await this.getAppointment(id);
        if(currentAppointment){
            const newData = await AppointmentModel.deleteAppointment(id);
            return Promise.resolve(newData);
        }
        return currentAppointment;
    }

    async getByPatient(authorId: number){
        if(!(authorId)){
            return Promise.reject("Inform the patient's id");
        }
        const patients = await AppointmentModel.filterByPatient(authorId);
        if(patients){
            return Promise.resolve(patients);
        } else {
            return Promise.resolve("No data found");
        }
    }

    async getByDate(date: Date){
        if(!(date)){
            return Promise.reject("Inform the date");
        }
        const patients = await AppointmentModel.filterByDate(date);
        if(patients){
            return Promise.resolve(patients);
        } else {
            return Promise.resolve("No data found");
        }
    }
}
export default new Appointment();
import { connection } from '../index';

class AppointmentModel {

    async createAppointment(authorId: number, type: string, date: Date){
        const newAppointment = await connection.consulta.create({
            data: {
                author: {
                    connect: {
                        id: Number(authorId)
                    }
                },
                date,
                type
            }
        })
        return newAppointment;
    }

    async findTime(date: Date){
        const isOpenDate = await connection.consulta.findMany({
            where: {
                date
            }
        })
        return isOpenDate;
    }

    async findAppointment(id: number){
        const appointment = await connection.consulta.findUnique({
            where:{
                id
            }
        })
        return appointment;
    }

    async updateAppointment(id: number, type: string){
        const appointment = await connection.consulta.update({
            where: {
                id
            }, 
            data: {
                type
            }
        })
        return appointment;
    }

    async deleteAppointment(id: number){
        const appointment = await connection.consulta.delete({
            where: {
                id
            }
        })
        return appointment;
    }

    async filterByPatient(authorId: number){
        const patients = await connection.consulta.findMany({
            where: {
                authorId
            }, 
            orderBy: {
                id: 'asc' 
            }
        })
        return patients;
    }

    async filterByDate(date: Date){
        const patients = await connection.consulta.findMany({
            where: {
                date
            }, 
            orderBy: {
                date: 'asc' 
            }
        })
        return patients;
    }
}

export default new AppointmentModel();
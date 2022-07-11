import { Router, Request, Response } from 'express';
import { AuthMiddleware } from '../middlewares';
import AppointmentController from '../controllers/appointment';
import { parseJSON, parseISO } from 'date-fns';

const route = Router();

export default (app: Router) => {

  app.use('/appointment', route);

  route.get('/bydate', async (req: Request, res: Response) => {
    const { date } = req.body;
    try{
      const newAppointment = await AppointmentController.getByDate(date);
      if(newAppointment){
        return res.send({ message: newAppointment }).status(201).end();
      } else {
        return res.send({ message: "There is no data" }).status(400).end();
      }
    } catch(e){
      return res.send({ error: e }).status(400).end()
    }
  });

  route.get('/bypatient', async (req: Request, res: Response) => {
    const { authorId } = req.body;
    try{
      const newAppointment = await AppointmentController.getByPatient(authorId);
      if(newAppointment){
        return res.send({ message: newAppointment }).status(201).end();
      } else {
        return res.send({ message: "There is no data" }).status(400).end();
      }
    } catch(e){
      return res.send({ error: e }).status(400).end()
    }
  });

  route.post('/newappointment', async (req: Request, res: Response) => {
    const { authorId, type, date } = req.body;
    try{
      const newAppointment = await AppointmentController.newAppointment(authorId, type, date);
      if(newAppointment){
        return res.send({ message: "New appointment created" }).status(201).end();
      } else {
        return res.send({ message: "Invalid Data" }).status(400).end();
      }
    } catch(e){
      return res.send({ error: e }).status(400).end()
    }
  });

  route.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const appointment = await AppointmentController.getAppointment(Number(id));
      if(appointment){
        return res.send({ message: appointment }).status(201).end();
      } else {
        return res.send({ message: "Invalid Data" }).status(400).end();
      }
    } catch(e) {
      return res.send({ error: e }).status(400).end()
    }
  });

  route.put('/:id', AuthMiddleware, async (req: Request, res: Response) => {
    const { id } = req.query;
    const { type } = req.body;
    try{
      const appointment = await AppointmentController.updateAppointment(Number(id), type);
      if(appointment){
        return res.send({ message: appointment }).status(203).end();
      } else {
        return res.send({ message: "Invalid Data" }).status(400).end();
      }
    } catch(e) {
      return res.send({ error: e }).status(400).end()
    }
  });

  route.delete('/:id', AuthMiddleware, async (req: Request, res: Response) => {
    const { id } = req.query;
    try{
      const appointment = await AppointmentController.deleteAppointment(Number(id));
      if(appointment){
        return res.send({ message: "Appointment has been deleted" }).status(203).end();
      } else {
        return res.send({ message: "Invalid Data" }).status(400).end();
      }
    } catch(e) {
      return res.send({ error: e }).status(400).end()
    }
  }); 
};
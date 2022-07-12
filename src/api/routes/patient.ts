import { Router, Request, Response } from 'express';
import { checkMiddleware, AuthMiddleware } from '../middlewares';
import PatientController from '../controllers/patient';

const route = Router();

export default (app: Router) => {
	app.use('/patient', route);
	route.get('/', checkMiddleware, (req: Request, res: Response) => {
		return res.send({ message: 'appointment' }).status(200).end();
	});

	route.post(
		'/newpatient',
		AuthMiddleware,
		async (req: Request, res: Response) => {
			const { name, phone } = req.body;
			try {
				const newPatient = await PatientController.createPatient(name, phone);
				return res.send({ message: newPatient }).status(201).end();
			} catch (e) {
				return res.send({ error: e }).status(400).end();
			}
		},
	);

	route.get(
		'/patient/:phone',
		AuthMiddleware,
		async (req: Request, res: Response) => {
			const { phone } = req.params;
			try {
				const newPatient = await PatientController.findPatient(phone);
				return res.send({ data: newPatient }).status(200).end();
			} catch (e) {
				return res.send({ error: e }).status(404).end();
			}
		},
	);
};

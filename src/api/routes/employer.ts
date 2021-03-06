import { Router, Request, Response } from 'express';
import { AuthMiddleware } from '../middlewares';
import EmployerController from '../controllers/employer';
import AuthController from '../controllers/auth';
const route = Router();

export default (app: Router) => {
	app.use('/employer', route);

	route.post('/newemployer', async (req: Request, res: Response) => {
		const { name, password, email } = req.body;
		const { master } = req.query;

		if (master !== process.env.MASTER) {
			return res.send({ message: 'Invalid Data' }).status(401).end();
		}

		try {
			const newEmployer = await EmployerController.createEmployer(
				email,
				password,
				name,
			);
			if (newEmployer) {
				return res.send({ message: 'New employer created' }).status(201).end();
			}
		} catch (e) {
			return res.send({ error: e }).status(400).end();
		}
	});

	route.post('/login', async (req: Request, res: Response) => {
		const { email, password } = req.body;
		try {
			const isTokenValid = await AuthController.authenticate(email, password);
			if (isTokenValid) {
				return res
					.send({ auth: true, JWTtoken: isTokenValid, user: email })
					.status(200)
					.end();
			}
		} catch (e) {
			return res.send({ auth: false, error: e }).status(401).end();
		}
	});

	route.post('/logout', AuthMiddleware, async (req: Request, res: Response) => {
		return res.json({ auth: false, token: null });
	});
};

import { Router } from 'express';
import { employerRoute, appointmentRoute, patientRoute } from './routes'

export default () => {
	const app = Router();
	employerRoute(app);
	appointmentRoute(app);
	patientRoute(app);
	return app
}
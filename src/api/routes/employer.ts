import { Router, Request, Response } from 'express';
import { checkMiddleware, AuthMiddleware } from '../middlewares';
import EmployerController from '../controllers/employer';
import AuthController from '../controllers/auth';
const route = Router();

export default (app: Router) => {
  app.use('/employer', route);
  route.get('/', checkMiddleware, (req: Request, res: Response) => {
    return res.send({ message: "criar empregado" }).status(200).end();
  });

  route.post('/newemployer',  async (req: Request, res: Response) => {
    const { name, password, email } = req.body;
    const { master } = req.query;

    if(master !== process.env.MASTER){
      return res.send({ message: "Invalid Data" }).status(400).end();
    }

    try {
      const newEmployer = await EmployerController.createEmployer(email, password, name);
      if (newEmployer) {
        return res.send({ message: "New employer created" }).status(201).end();
      } else {
        return res.send({ message: "Invalid Data" }).status(400).end();
      }
    } catch (e) {
      return res.send({ error: e }).status(400).end()
    }
  });

  route.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const isTokenValid = await AuthController.authenticate(email, password);
      if (isTokenValid) {
        //console.log('10000',isTokenValid)
        return res.send({ auth: true, JWTtoken: isTokenValid }).status(200).end()
      }
    } catch (e) {
      return res.send({ auth: false, error: e }).status(400).end()
    }
  });

  route.post('/logout', AuthMiddleware, async (req: Request, res: Response) => {
    return res.json({ auth: false, token: null})
  });
};
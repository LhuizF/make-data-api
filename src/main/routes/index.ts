import { Router } from 'express';
import { MakeData } from '../controllers/MakeData';

export default () => {
  const router = Router();

  router.get('/', new MakeData().handle);

  return router;
};

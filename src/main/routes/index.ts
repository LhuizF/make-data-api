import { Router } from 'express';

export default () => {
  const router = Router();

  router.get('/', (req, res) => {
    res.send('Hello World!');
  });

  return router;
};

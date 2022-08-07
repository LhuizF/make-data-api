import express, { json } from 'express';

export default () => {
  const app = express();
  app.use(json());
};

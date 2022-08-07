import express, { json } from 'express';
import { cors } from '../config/cors';
import routes from '../main/routes';

const app = express();

app.use(json());
app.use(cors);
app.use(routes());

export default app;

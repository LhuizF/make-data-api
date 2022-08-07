import express, { json } from 'express';
import { cors } from '../config/cors';

const app = express();

app.use(json());
app.use(cors);

export default app;

 import bodyParser from 'body-parser';
import express, { Application, Request, Response, NextFunction } from 'express';
import { routes } from './routes/index.route';
import cors from 'cors';

const app: Application = express();
const port: Number = 3000;

// parse body request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cors access handler
app.use(cors());
app.use((_req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

routes(app);

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

var options = {
  explorer: true
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});

// import {main} from "./wa";
// main()
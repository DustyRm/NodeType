import * as express from 'express';
import routes from './routes/userRoutes';
import { swaggerUi, specs } from '@shared/config/swagger';

const app = express();
app.use(express.json());
app.use('/api/users', routes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

export { app };

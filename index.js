import express from 'express';
import {} from 'dotenv/config.js';
import { vehicleRoutes } from './routes/vehicle.routes.js';
import { AppError, handleError } from './helpers/error.js';
import { HTTP_STATUS_CODES } from './helpers/constants.js';

const app = express();

// middlewares
app.use(express.json());

// routing
vehicleRoutes(app);

app.all('*', (req, _, next) => {
  next(new AppError(`Can't find ${req.method} ${req.originalUrl} on this server!`, HTTP_STATUS_CODES.NOT_FOUND));
});

// centralized error handling
app.use((err, req, res, _) => {
  handleError(err, req, res, _);
});

// running the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at ${PORT}`));

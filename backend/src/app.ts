import express from "express";
import cors from "cors";
import router from "./routes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.status(200).json({
    message: 'connect',
    service: 'backend is active',
    timestamp: new Date().toISOString(),
  });
});

app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'backend',
    timestamp: new Date().toISOString(),
  });
});


app.use('/api/v0', router)

/**
 * Global error handler (MUST be last)
 */
app.use(errorHandler);
export default app;

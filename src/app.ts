import express from "express";
import cors from "cors";
import router from "./routes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "OK" });
});

app.use('/api/v0', router)

/**
 * Global error handler (MUST be last)
 */
app.use(errorHandler);
export default app;

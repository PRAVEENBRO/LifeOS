import app from "./app";
import { configEnv } from "./shared";

const port = configEnv.port || 3000;
const host = process.env.HOST || "0.0.0.0";

const startServer = () => {
  
  app.listen(port, host, () => {
    console.log(`Server running on http://${host}:${port}`);
  });
};

startServer();

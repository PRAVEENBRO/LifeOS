import app from "./app";
import { configEnv } from "./shared";

const port = configEnv.port || 3000;

const startServer = () => {
  
  app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });
};

startServer();

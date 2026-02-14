import app from "./app";

const port = 3000;

const startServer = () => {
  
  app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });
};

startServer();

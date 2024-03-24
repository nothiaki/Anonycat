import { httpServer } from './http';

const PORT: number = 3000;

httpServer.listen(PORT, () => {
  console.log(`> Server on: http://localhost:${PORT}`)
});

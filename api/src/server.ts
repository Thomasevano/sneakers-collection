import { app } from './app';

const server = app();

server.listen(3000, (err: Error, address: string) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server listening at ${address}`);
});

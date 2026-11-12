import http from 'node:http';
import { PostgreSqlContainer } from '@testcontainers/postgresql';

const PG_PORT = 54329;      // host port the backend will connect to
const READY_PORT = 54330;   // Playwright polls this to know Postgres is ready

const container = await new PostgreSqlContainer('postgres:16')
    .withDatabase('vizsgaremek_test')
    .withUsername('postgres')
    .withPassword('postgres')
    .withExposedPorts({ container: 5432, host: PG_PORT })
    .start();

// Open the ready port only after Postgres accepts connections.
// (Docker binds the Postgres port early, so that port alone isn't a reliable signal.)
const readyServer = http
    .createServer((_, res) => res.end('ok'))
    .listen(READY_PORT, () => console.log(`Postgres ready on localhost:${PG_PORT}`));

const stop = async () => {
    readyServer.close();
    await container.stop();
    process.exit(0);
};
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
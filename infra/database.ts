import { Client, QueryResult, QueryConfig } from "pg";

interface ClientConfig {
  host: string;
  port: number;
  user: string;
  database: string;
  password: string;
  ssl: boolean | { ca: string };
}

function getSSLValues(): boolean | { ca: string } {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA as string,
    };
  }

  return process.env.NODE_ENV === "production" ? true : false;
}

async function getNewClient(): Promise<Client> {
  const client = new Client({
    host: process.env.POSTGRES_HOST as string,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER as string,
    database: process.env.POSTGRES_DB as string,
    password: process.env.POSTGRES_PASSWORD as string,
    ssl: getSSLValues(),
  });

  await client.connect();
  return client;
}

async function query(queryObject: QueryConfig): Promise<QueryResult> {
    let client: Client | null = null;
    try {
        client = await getNewClient();
        const result = await client.query(queryObject);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        if (client) {
            await client.end();
        }
    }
}

const database = {
  query,
  getNewClient,
};

export default database;

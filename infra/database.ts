import { env } from "@/utils/env";
import { Client } from "pg";

async function query(queryObject: string | { text: string; values: any[] }) {
  const client = new Client({
    host: env.POSTGRES_HOST,
    port: Number(env.POSTGRES_PORT),
    user: env.POSTGRES_USER,
    database: env.POSTGRES_DB,
    password: env.POSTGRES_PASSWORD,
    ssl: getSSLValues(),
  });

  try {
    await client.connect();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client.end();
  }
}

const database = {
    query: query,
};

export default database;

function getSSLValues() {
    if (process.env.POSTGRES_CA) {
        return {
            ca: process.env.POSTGRES_CA,
        };
    }

    return process.env.NODE_ENV === "development" ? false : true;
}

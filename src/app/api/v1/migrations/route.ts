import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database.js";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const dbClient = await database.getNewClient();

  const defaultMigrationOptions = {
    dbClient: dbClient,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };

  // @ts-ignore
  const pendingMigrations = await migrationRunner(defaultMigrationOptions);
  await dbClient.end();
  return NextResponse.json(pendingMigrations);
}

export async function POST(request: NextRequest) {
  const dbClient = await database.getNewClient();

  const defaultMigrationOptions = {
    dbClient: dbClient,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };

  // @ts-ignore
  const migratedMigrations = await migrationRunner({
    ...defaultMigrationOptions,
    dryRun: false,
  });

  await dbClient.end();

  if (migratedMigrations.length > 0) {
    return NextResponse.json(migratedMigrations, { status: 201 });
  }

  return NextResponse.json(migratedMigrations, { status: 200 });
}

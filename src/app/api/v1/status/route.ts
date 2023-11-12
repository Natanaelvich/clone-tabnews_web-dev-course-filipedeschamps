import database from "@infra/database";

export async function GET(request: Request) {
  const result = await database.query("SELECT 1 + 1 as sum");
  console.log(result.rows);

  return Response.json({ status: "ok" });
}

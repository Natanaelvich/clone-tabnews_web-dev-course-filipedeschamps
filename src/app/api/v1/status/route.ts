import database from "@infra/database";

async function GET() {
    const result = await database.query("SELECT 1 + 1 as sum");
    console.log(result.rows);
    Response.json({ chave: "são acima da média" });
  }
  
  export default status;
  
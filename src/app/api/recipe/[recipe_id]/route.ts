'use server';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

//get a specific recipe
export async function GET(
    request: Request,
    { params }: { params: Promise<{ recipe_id: string }> }
) {
    const client = await pool.connect();

    const { recipe_id } = await params;

    const text = 'SELECT * FROM "recipe" WHERE "id" = $1';
    const values = [recipe_id];

    const res = await client.query(text, values);
    client.release();

    return Response.json(res);
}

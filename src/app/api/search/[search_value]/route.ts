'use server';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function GET(
    request: Request,
    { params }: { params: Promise<{ search_value: string }> }
) {
    const client = await pool.connect();
    const { search_value } = await params;

    const text =
        "SELECT id, title FROM recipe WHERE title_search @@ to_tsquery('english', $1)";
    const values = [search_value];

    const res = await client.query(text, values);
    client.release();

    return Response.json(res.rows);
}

'use server';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

//get a specific recipe, normally to display it in a page.
export async function GET(
    request: Request,
    { params }: { params: Promise<{ recipe_id: string }> }
) {
    const client = await pool.connect();
    const { recipe_id } = await params;

    //TODO: make 2 separate endpoints so the instructions are not sent multiple times, to save on the amount of data being sent on the server
    const recipe_text =
        'SELECT r.title, r.instructions, i.name, i.measurement_type, i.amount FROM recipe AS r JOIN ingredient AS i ON r.id = i.recipe_id WHERE r.id = $1';
    const values = [recipe_id];

    const res = await client.query(recipe_text, values);
    client.release();

    return Response.json(res);
}

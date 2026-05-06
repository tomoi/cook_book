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
        "SELECT id, title FROM recipe WHERE title_search @@ plainto_tsquery('english', $1)";
    const values = [
        search_value
            .replace(/[^a-z ]/gi, '') // replace anything that is not a letter with nothing
            .replace(/  +/g, ' ') // replace double + spaces with a single space
            .trim(), // remove whitespace at the beginning and end of the string
        // .replace(/ /g, ' & ')}:*`, // replace single spaces with an & symbol so that postgresql can read it
    ];

    const res = await client.query(text, values);
    client.release();

    return Response.json(res.rows);
}

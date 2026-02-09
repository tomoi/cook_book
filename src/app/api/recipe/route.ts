'use server';

import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function GET(request: Request) {
    const client = await pool.connect();
    const res = await client.query('SELECT "name" FROM "user"');
    client.release();

    console.log(Response.json(res));

    return Response.json(res);
}

export async function POST(request: Request) {
    const client = await pool.connect();
    const res = await client.query('');
}

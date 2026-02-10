'use server';

import { getUserSession } from '@/app/actions/auth';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

//get a list of recipes, for the homepage or things similar
export async function GET(request: Request) {
    const client = await pool.connect();
    const res = await client.query('SELECT "title" FROM "recipe"');
    client.release();

    console.log(Response.json(res));

    return Response.json(res);
}

//type for the object that will be passed in the body
interface Recipe {
    title: string;
    ingredients: {
        ingredient: string;
        count: number;
        measure_type: string;
    }[];
    instructions: string;
}

export async function POST(req: Request) {
    //get user information because the recipe is tied to the user
    const userSession = await getUserSession();
    const data: Recipe = await req.json();
    //connect to the pg database
    const client = await pool.connect();

    const text =
        'INSERT INTO recipe(title, instructions, user_id) VALUES($1, $2, $3) RETURNING id';
    const values = [data.title, data.instructions, userSession?.user.id];
    const res = await client.query(text, values);

    //TODO: make the insert command into the ingredients table as well https://stackoverflow.com/questions/20815028/how-do-i-insert-multiple-values-into-a-postgres-table-at-once
    client.release();

    console.log(res.rows);
    return Response.json(res);
}

//a object that the server is likely to receive.
let objectType = {
    title: 'Brownies ',
    ingredients: [
        {
            ingredient: 'Flour',
            count: 2,
            measure_type: 'cup',
        },
        {
            ingredient: 'Butter',
            count: 1,
            measure_type: 'cup',
        },
    ],
    instructions: 'Add it all together and bake broski',
};

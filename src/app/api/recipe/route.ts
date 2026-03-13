'use server';

import { getUserSession } from '@/app/actions/auth';
import { Pool } from 'pg';

import type { RecipeObject } from '@/app/interfaces';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

//get a list of recipes, for the homepage or things similar
export async function GET(request: Request) {
    const client = await pool.connect();
    const res = await client.query(
        'SELECT "title", "date_created", id FROM "recipe"'
    );
    client.release();

    return Response.json(res.rows);
}

export async function POST(req: Request) {
    //get user information because the recipe is tied to the user
    const userSession = await getUserSession();
    const data: RecipeObject = await req.json();
    const current_date = Date.now();
    //connect to the pg database
    const client = await pool.connect();

    const recipe_text =
        'INSERT INTO recipe(title, instructions, user_id, date_created, rating) VALUES($1, $2, $3, $4, 0) RETURNING id';
    const recipe_values = [
        data.title,
        data.instructions,
        userSession?.user.id,
        current_date,
    ];
    const res = await client.query(recipe_text, recipe_values);

    const ingredients_text =
        'INSERT INTO ingredient(name, measurement_type, amount, recipe_id) VALUES($1, $2, $3, $4)';

    for (const i of data.ingredients) {
        const ingredients_values = [
            i.name,
            i.measurement_type,
            i.amount,
            res.rows[0].id,
        ];
        const res2 = await client.query(ingredients_text, ingredients_values);
    }

    client.release();
    return Response.json({ id: res.rows[0].id });
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
